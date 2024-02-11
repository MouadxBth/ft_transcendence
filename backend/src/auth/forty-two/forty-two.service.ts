import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ZodError } from "zod";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";
import fortyTwoProfileSchema, { FortyTwoUserProfile } from "./schemas/profile.schema";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Injectable()
export class FortyTwoService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

	async validate(profile: unknown): Promise<AuthenticatedUser | null> {
		let userProfile: FortyTwoUserProfile;

		try {
			userProfile = fortyTwoProfileSchema.parse(profile);
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				throw new HttpException(`Invalid profile: ${error.message}}`, HttpStatus.BAD_REQUEST);
			} else {
				throw new HttpException(`Unexpected issue: ${error}`, HttpStatus.BAD_REQUEST);
			}
		}

		let user;

		try {
			user = await this.userService.findOne(userProfile.username);
		} catch (error: unknown) {
			user = await this.handleFirstTime(userProfile);
		}

		const { twoFactorAuthenticationSecret, ...result } = user;

		return {
			user: result,
			valid2Fa: false,
		};
	}

	redirect(res: Response) {
		const landingPage = this.configService.get<string>("FRONTEND_HOME_PAGE")!;
		return res.redirect(landingPage);
	}

	async handleFirstTime(profile: FortyTwoUserProfile) {
		const avatar =
			profile._json.image.link ||
			encodeURI(`https://robohash.org/${profile.displayName.toLocaleLowerCase()}`);

		return await this.userService.create({
			username: profile.username,
			password: undefined,
			firstName: profile.name?.givenName || "unknown",
			lastName: profile.name?.familyName || "unknown",
			avatar: avatar,
		});
	}
}
