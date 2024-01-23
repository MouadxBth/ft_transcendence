import { Module } from "@nestjs/common";
import { LevelService } from "./level.service";
import { LevelController } from "./level.controller";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [UserModule],
	controllers: [LevelController],
	providers: [LevelService],
})
export class LevelModule {}
