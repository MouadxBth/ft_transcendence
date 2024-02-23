import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, ValidateNested } from "class-validator";
import { GamePlayer } from "src/game/entities/game-player.entity";

export class MatchResultDto {
	@IsNumber()
	@IsNotEmpty()
	matchId: number;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => GamePlayer)
	player1: GamePlayer;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => GamePlayer)
	player2: GamePlayer;
}
