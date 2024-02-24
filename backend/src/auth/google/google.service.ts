import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ZodError } from "zod";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";
import { Response } from "express";
import googleProfileSchema, { GoogleUserProfile } from "./schemas/profile.schema";
import { ConfigService } from "@nestjs/config";
import { OnlineStatusService } from "src/online-status/online-status.service";

@Injectable()
export class GoogleService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly onlineStatusService: OnlineStatusService
	) {}

	async validate(profile: unknown): Promise<AuthenticatedUser | null> {
		let userProfile: GoogleUserProfile;

		try {
			userProfile = googleProfileSchema.parse(profile);
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				throw new HttpException(`Invalid profile: ${error.message}}`, HttpStatus.BAD_REQUEST);
			} else {
				throw new HttpException(`Unexpected issue: ${error}`, HttpStatus.BAD_REQUEST);
			}
		}

		const status = this.onlineStatusService.onlineStatus(userProfile.id);

		if (status && status !== "Offline") {
			throw new HttpException(`You are already connected somewhere else!`, HttpStatus.AMBIGUOUS);
		}

		let user;

		try {
			user = await this.userService.findOne(userProfile.id);
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

	async handleFirstTime(profile: GoogleUserProfile) {
		const avatar =
			profile.photos[0]?.value ||
			encodeURI(`https://robohash.org/${profile.displayName.toLocaleLowerCase()}`);

		return await this.userService.create({
			username: profile.displayName.replace(" ", "."),
			password: undefined,
			firstName: profile.name?.givenName || "unknown",
			lastName: profile.name?.familyName || "unknown",
			avatar: avatar,
		});
	}
}
