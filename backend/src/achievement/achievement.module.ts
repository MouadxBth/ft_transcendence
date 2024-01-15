import { Module } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AchievementController } from "./achievement.controller";
import { UserModule } from "src/user/user.module";

@Module({
	controllers: [AchievementController],
	providers: [AchievementService],
	imports: [UserModule],
})
export class AchievementModule {}
