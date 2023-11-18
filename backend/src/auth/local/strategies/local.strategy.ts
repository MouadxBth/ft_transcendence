import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LocalService } from "../local.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	@Inject()
	private readonly localService: LocalService;

	async validate(username: string, password: string) {
		return await this.localService.validate(username, password);
	}
}
