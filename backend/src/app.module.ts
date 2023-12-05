import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigSchema } from "./config/config.schema";
import { RedisModule } from "./redis/redis.module";
import { CacheModule } from "@nestjs/cache-manager";
import { ioRedisStore } from "@tirke/node-cache-manager-ioredis";
import { RedisClient } from "./redis/redis.provider";
import { AuthModule } from "./auth/auth.module";
import { ConversationModule } from "./conversation/conversation.module";

@Module({
	imports: [
		PrismaModule,
		UserModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			validationSchema: ConfigSchema,
			envFilePath: [".env", ".env.example"],
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [RedisModule],
			inject: ["REDIS_CLIENT"],
			useFactory: (client: RedisClient) => {
				return {
					isGlobal: true,
					store: ioRedisStore({
						redisInstance: client,
					}),
				};
			},
		}),
		AuthModule,
		ConversationModule,
	],
})
export class AppModule {}
