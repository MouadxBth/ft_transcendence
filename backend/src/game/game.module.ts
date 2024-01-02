import { Module } from "@nestjs/common";
import { MatchHistoryModule } from "./match-history/match-history.module";
import { GameGateway } from "./game.gateway";

@Module({
	imports: [MatchHistoryModule],
	providers: [GameGateway],
})
export class GameModule {}
