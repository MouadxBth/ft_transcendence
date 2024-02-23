import { Module } from "@nestjs/common";
import { NotificationsGateway } from "./notifications.gateway";
import { OnlineStatusModule } from "src/online-status/online-status.module";
import { GameModule } from "src/game/game.module";

@Module({
	providers: [NotificationsGateway],
	imports: [OnlineStatusModule, GameModule],
})
export class NotificationsModule {}
