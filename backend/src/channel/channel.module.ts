import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { AuthModule } from "src/auth/auth.module";
import { ChannelGateway } from "./gateway/channel.gateway";
import { ChannelMessageService } from "./message/channel-message.service";
import { ChannelMemberController } from "./member/channel-member.controller";
import { ChannelMemberService } from "./member/channel-member.service";
import { ChannelOwnerController } from "./owner/channel-owner.controller";
import { ChannelAdminController } from "./admin/channel-admin.controller";
import { ChannelOwnerService } from "./owner/channel-owner.service";
import { ChannelAdminService } from "./admin/channel-admin.service";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";
import { UserModule } from "src/user/user.module";
import { ChannelMessageController } from "./message/channel-message.controller";

@Module({
	imports: [forwardRef(() => AuthModule), UserModule],
	controllers: [
		ChannelController,
		ChannelMemberController,
		ChannelMessageController,
		ChannelOwnerController,
		ChannelAdminController,
	],
	providers: [
		ChannelService,
		ChannelGateway,
		ChannelMessageService,
		ChannelMemberService,
		ChannelOwnerService,
		ChannelAdminService,
	],
})
export class ChannelModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes("channel");
	}
}
