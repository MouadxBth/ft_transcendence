import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { MatchHistoryController } from "./match-history.controller";
import { MatchHistoryService } from "./match-history.service";

@Module({
	imports: [UserModule],
	controllers: [MatchHistoryController],
	providers: [MatchHistoryService],
	exports: [MatchHistoryService],
})
export class MatchHistoryModule {}
