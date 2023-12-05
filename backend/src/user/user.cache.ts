import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import { type Cache } from "cache-manager";

@Injectable()
export class UserCache {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		private readonly configService: ConfigService
	) {}

	async get(username: string) {
		return await this.cacheService.get<User>(`user:${username}`);
	}

	async getAndUpdate(username: string) {
		const result = await this.get(username);
		if (result) await this.set(result);
		return result;
	}

	async set(user: User) {
		return await this.cacheService.set(
			`user:${user.username}`,
			user,
			this.configService.get<number>("REDIS_CACHE_TTL")
		);
	}

	async update(username: string, user: User) {
		const old = await this.get(username);

		if (old && old.username != user.username) {
			await this.cacheService.del(`user:${old.username}`);
		}
		return await this.set(user);
	}

	async delete(username: string) {
		return await this.cacheService.del(`user:${username}`);
	}
}
