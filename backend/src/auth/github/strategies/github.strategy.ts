import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import { ConfigService } from "@nestjs/config";
import { GithubService } from "../github.service";
import { Strategy } from "passport-github2";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
	@Inject()
	private readonly githubService: GithubService;

	constructor(configService: ConfigService) {
		super({
			clientID: configService.get<string>("GITHUB_CLIENT_ID"),
			clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET"),
			callbackURL: configService.get<string>("GITHUB_CLIENT_CALLBACK_URL"),
			scope: ["public"],
		});
	}

	async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
		return await this.githubService.validate(profile);
	}
}
