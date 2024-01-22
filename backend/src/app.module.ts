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
import { BlockedModule } from "./blocked/blocked.module";
import { FriendModule } from "./friend/friend.module";
import { OnlineStatusModule } from "./online-status/online-status.module";
import { AchievementModule } from "./achievement/achievement.module";
import { FileUploadModule } from "./file-upload/file-upload.module";
import { ChannelModule } from "./channel/channel.module";
import { MatchHistoryModule } from "./match-history/match-history.module";
import { NotificationsModule } from "./notifications/notifications.module";

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
		BlockedModule,
		FriendModule,
		OnlineStatusModule,
		AchievementModule,
		FileUploadModule,
		ChannelModule,
		MatchHistoryModule,
		NotificationsModule,
	],
})
export class AppModule {}
