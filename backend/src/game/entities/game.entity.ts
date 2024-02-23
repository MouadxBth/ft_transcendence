import { GamePlayer } from "./game-player.entity";

export class Game {
	id: number;

	createdAt: Date;

	type: string;

	player1: GamePlayer;

	player2: GamePlayer;
}
