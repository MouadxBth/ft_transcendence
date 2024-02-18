import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { AuthModule } from "src/auth/auth.module";
import { ChannelGateway } from "./gateway/channel.gateway";
import { ChannelMessageService } from "./message/channel-message.service";
import { ChannelMemberController } from "./member/channel-member.controller";
import { ChannelMemberService } from "./member/channel-member.service";
import { ChannelOwnerService } from "./owner/channel-owner.service";
import { ChannelAdminService } from "./admin/channel-admin.service";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";
import { UserModule } from "src/user/user.module";
import { ChannelMessageController } from "./message/channel-message.controller";
import { ChannelAdminGateway } from "./admin/channel-admin.gateway";
import { ChannelOwnerGateway } from "./owner/channel-owner.gateway";
import { ChannelMessageGateway } from "./message/channel-message.gateway";
import { BlockedModule } from "src/blocked/blocked.module";
import { ChannelUtilities } from "./channel.utilities";
import { ChannelMessageUtilities } from "./message/channel-message.utilities";
import { ChannelAdminUtilities } from "./admin/channel-admin.utilities";

@Module({
	imports: [forwardRef(() => AuthModule), UserModule, BlockedModule],
	controllers: [ChannelController, ChannelMemberController, ChannelMessageController],
	providers: [
		ChannelUtilities,
		ChannelMessageUtilities,
		ChannelAdminUtilities,
		ChannelService,
		ChannelGateway,
		ChannelOwnerGateway,
		ChannelAdminGateway,
		ChannelMessageGateway,
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
