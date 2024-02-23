import { IsNotEmpty, IsNumber, IsString } from "class-validator";

// export enum GameState {
// 	STOPPED,
// 	PLAYING,
// 	REQUEST,
// }

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
