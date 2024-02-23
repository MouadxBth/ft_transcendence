import { Module } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementController } from "./achievement.controller";
import { UserModule } from "src/user/user.module";
import { AchievementGateway } from "./achievement.gateway";

@Module({
	controllers: [AchievementController],
	providers: [AchievementService, AchievementGateway],
	exports: [AchievementService],
	imports: [UserModule],
})
export class AchievementModule {}
