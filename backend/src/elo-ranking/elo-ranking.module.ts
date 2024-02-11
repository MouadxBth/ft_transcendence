import { Module } from "@nestjs/common";
import { EloRankingService } from "./elo-ranking.service";
import { EloRankingController } from "./elo-ranking.controller";
import { UserModule } from "src/user/user.module";
import { MatchHistoryModule } from "src/match-history/match-history.module";

@Module({
	imports: [UserModule, MatchHistoryModule],
	controllers: [EloRankingController],
	providers: [EloRankingService],
})
export class EloRankingModule {}
