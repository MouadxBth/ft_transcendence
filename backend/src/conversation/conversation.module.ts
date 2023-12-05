import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationController } from "./conversation.controller";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";
import { ConversationGateway } from "./conversation.gateway";
import { DirectMessageService } from "./direct-message/direct-message.service";
import { DirectMessageController } from "./direct-message/direct-message.controller";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";
import { ConversationCache } from "./conversation.cache";
import { BlockedModule } from "src/blocked/blocked.module";

@Module({
	imports: [AuthModule, UserModule, BlockedModule],
	controllers: [ConversationController, DirectMessageController],
	providers: [ConversationService, ConversationGateway, ConversationCache, DirectMessageService],
})
export class ConversationModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes(ConversationController, DirectMessageController);
	}
}
