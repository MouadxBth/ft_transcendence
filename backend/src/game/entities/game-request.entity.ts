import { GameRequestPlayer } from "./game-request-player.entity";

export class GameRequest {
	sender: GameRequestPlayer;

	target: GameRequestPlayer;

	matchId?: number;

	superMatch: boolean;
}
