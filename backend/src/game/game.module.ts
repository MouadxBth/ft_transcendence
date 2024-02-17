import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { MatchHistoryModule } from "src/match-history/match-history.module";

@Module({
	imports: [MatchHistoryModule],
	providers: [GameGateway],
})
export class GameModule {}
