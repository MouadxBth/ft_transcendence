import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { MatchHistoryModule } from "src/match-history/match-history.module";
import { GameService } from "./game.service";
import { OnlineStatusModule } from "src/online-status/online-status.module";
import { UserModule } from "src/user/user.module";
import { GameController } from "./game.controller";
import { BlockedModule } from "src/blocked/blocked.module";
import { FriendModule } from "src/friend/friend.module";
import { EloRankingModule } from "src/elo-ranking/elo-ranking.module";
import { LevelModule } from "src/level/level.module";
import { AchievementModule } from "src/achievement/achievement.module";

@Module({
	imports: [
		MatchHistoryModule,
		OnlineStatusModule,
		UserModule,
		BlockedModule,
		FriendModule,
		MatchHistoryModule,
		EloRankingModule,
		LevelModule,
		AchievementModule,
	],
	controllers: [GameController],
	providers: [GameGateway, GameService],
	exports: [GameService],
})
export class GameModule {}
