import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { FriendController } from "./friend.controller";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";

@Module({
	controllers: [FriendController],
	providers: [FriendService],
})
export class FriendModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes(FriendController);
	}
}
