import { Module, forwardRef } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [ChannelController],
	providers: [ChannelService],
})
export class ChannelModule {}
