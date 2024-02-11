import { Module } from "@nestjs/common";
import { OnlineStatusController } from "./online-status.controller";
import { OnlineStatusService } from "./online-status.service";

@Module({
	providers: [OnlineStatusService],
	controllers: [OnlineStatusController],
	exports: [OnlineStatusService],
})
export class OnlineStatusModule {}
