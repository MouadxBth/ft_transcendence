import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { AuthModule } from "src/auth/auth.module";
import { ChannelGateway } from "./gateway/channel.gateway";
import { ChannelMessageService } from "./channel-message.service";
import { ChannelMemberController } from './channel-member.controller';
import { ChannelMemberService } from './channel-member.service';
import { ChannelOwnerController } from "./channel-owner.controller";
import { ChannelAdminController } from "./channel-admin.controller";
import { ChannelOwnerService } from "./channel-owner.service";
import { ChannelAdminService } from "./channel-admin.service";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [ChannelController, ChannelMemberController, ChannelOwnerController, ChannelAdminController],
	providers: [ChannelService, ChannelGateway, ChannelMessageService, ChannelMemberService, ChannelOwnerService, ChannelAdminService],
})
export class ChannelModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes("channel");
	}
}
