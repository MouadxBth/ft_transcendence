import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Conversation } from "@prisma/client";
import { type Cache } from "cache-manager";

@Injectable()
export class ConversationCache {
	constructor(
		@Inject(CACHE_MANAGER) private readonly cacheService: Cache,
		private readonly configService: ConfigService
	) {}

	private key(first: string, second: string) {
		return `conversation:${[first, second].sort().join("-")}`;
	}

	async get(first: string, second: string) {
		return await this.cacheService.get<Conversation>(this.key(first, second));
	}

	async getAndUpdate(first: string, second: string) {
		const result = await this.get(first, second);
		if (result) this.set(first, second, result);
		return result;
	}

	async set(first: string, second: string, conversation: Conversation) {
		return await this.cacheService.set(
			this.key(first, second),
			conversation,
			this.configService.get<number>("REDIS_CACHE_TTL")
		);
	}

	async delete(first: string, second: string) {
		return await this.cacheService.del(this.key(first, second));
	}
}
