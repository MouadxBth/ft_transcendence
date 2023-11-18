import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import Strategy from "passport-42";
import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
import { FortyTwoService } from "../forty-two.service";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy) {
	@Inject()
	private readonly fortyTwoService: FortyTwoService;

	constructor(configService: ConfigService) {
		super({
			clientID: configService.get<string>("FORTY_TWO_CLIENT_ID"),
			clientSecret: configService.get<string>("FORTY_TWO_CLIENT_SECRET"),
			callbackURL: configService.get<string>("FORTY_TWO_CLIENT_CALLBACK_URL"),
			scopes: ["public"],
		});
	}

	async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
		return await this.fortyTwoService.validate(profile);
	}
}
