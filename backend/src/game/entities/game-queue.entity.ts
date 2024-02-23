import { GameRequestPlayer } from "./game-request-player.entity";

export class GameQueue {
	sender?: GameRequestPlayer;

	target?: GameRequestPlayer;

	matchId?: number;

	superMatch: boolean;
}
