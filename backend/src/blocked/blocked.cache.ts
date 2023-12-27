import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { type Cache } from "cache-manager";
import { Blocked } from "./types/blocked.type";

@Injectable()
export class BlockedCache {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		private readonly configService: ConfigService
	) {}

	private key(username: string) {
		return `blocked:${username}`;
	}

	async get(username: string) {
		return await this.cacheService.get<Blocked>(this.key(username));
	}

	async getAndUpdate(username: string) {
		const result = await this.get(username);
		if (result) this.set(username, result);
		return result;
	}

	async set(username: string, blocked: Blocked) {
		return await this.cacheService.set(
			this.key(username),
			blocked,
			this.configService.get<number>("REDIS_CACHE_TTL")
		);
	}

	async delete(username: string) {
		return await this.cacheService.del(this.key(username));
	}
}
