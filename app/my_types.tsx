
export interface BallCords
{
  x : number,
  y : number
};

export class GameRoomDto {
	player1: string;
	player2: string;
	matchId: number;
	map?: string;
	powerUp?: string;
	time: number;
	winningPoints: number;
	// gameState: GameState;
}

export class PlayerMovementDto {
	pid : number;
	target: string;
	matchId: number;
	y: number;
}

export class PlayerDto {
	
	username: string;

	matchId: number;

	winner: boolean;

	draw: boolean;

	score: number;

	points: number;
}

export class MatchResultDto {
	Player1: PlayerDto;
	Player2: PlayerDto;
}
