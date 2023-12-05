import { Module } from "@nestjs/common";
import { OnlineStatusGateway } from "./online-status.gateway";

@Module({
	providers: [OnlineStatusGateway],
})
export class OnlineStatusModule {}
