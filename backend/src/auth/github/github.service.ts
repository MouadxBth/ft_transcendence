import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ZodError } from "zod";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";
import githubProfileSchema, { GithubUserProfile } from "./schemas/profile.schema";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";

@Injectable()
export class GithubService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

	async validate(profile: unknown): Promise<AuthenticatedUser | null> {
		let userProfile: GithubUserProfile;

		try {
			userProfile = githubProfileSchema.parse(profile);
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

	async handleFirstTime(profile: GithubUserProfile) {
		const avatar =
			profile.photos[0]?.value ||
			encodeURI(`https://robohash.org/${profile.displayName.toLocaleLowerCase()}`);

		return await this.userService.create({
			username: profile.username,
			password: undefined,
			firstName: profile.displayName.split(" ")[0] || "unknown",
			lastName: profile.displayName.split(" ")[1] || "unknown",
			avatar: avatar,
		});
	}
}
