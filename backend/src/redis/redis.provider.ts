import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

export type RedisClient = Redis;

export const redisProvider: Provider = {
	provide: "REDIS_CLIENT",
	inject: [ConfigService],
	useFactory: (configService: ConfigService): RedisClient => {
		return new Redis({
			host: configService.get<string>("REDIS_HOST"),
			port: configService.get<number>("REDIS_PORT"),
		});
	},
};
