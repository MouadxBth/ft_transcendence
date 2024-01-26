import { Module } from "@nestjs/common";
import { NotificationsGateway } from "./notifications.gateway";
import { OnlineStatusModule } from "src/online-status/online-status.module";

@Module({
	providers: [NotificationsGateway],
	imports: [OnlineStatusModule],
})
export class NotificationsModule {}
