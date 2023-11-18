import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
import { Strategy } from "passport-google-oauth20";
import { GoogleService } from "../google.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	@Inject()
	private readonly googleService: GoogleService;

	constructor(configService: ConfigService) {
		super({
			clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
			clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
			callbackURL: configService.get<string>("GOOGLE_CLIENT_CALLBACK_URL"),
			scope: ["profile"],
		});
	}

	async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
		return await this.googleService.validate(profile);
	}
}
