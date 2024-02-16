import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

// export enum GameState {
// 	STOPPED,
// 	PLAYING,
// 	REQUEST,
// }

export class GameRoomDto {
	@IsString()
	@IsNotEmpty()
	player1: string;
	@IsString()
	@IsNotEmpty()
	player2: string;
	@IsNumber()
	@IsOptional()
	matchId?: number;
	@IsString()
	@IsOptional()
	powerUp?: string;
	// gameState: GameState;
}

export class PlayerMovementDto {
	@IsString()
	@IsNotEmpty()
	target: string;

	@IsNumber()
	@IsNotEmpty()
	matchId: number;

	//variables related to the actual movements are still to be discussed
	@IsNumber()
	@IsNotEmpty()
	y: number;
}
