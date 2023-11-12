import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";
import { OwnerExistsRule } from "./rules/owner-exists.rule";

@Module({
	controllers: [ChannelController],
	providers: [ChannelService, OwnerExistsRule],
})
export class ChannelModule {}
