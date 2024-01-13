import { Type } from "class-transformer";
import {
	IsBoolean,
	IsNotEmpty,
	IsNotEmptyObject,
	IsNumber,
	IsObject,
	IsString,
	ValidateNested,
} from "class-validator";

class PlayerDto {
	@IsString()
	@IsNotEmpty()
	username: string;
	@IsNumber()
	@IsNotEmpty()
	matchId: number;
	@IsBoolean()
	@IsNotEmpty()
	winner: boolean;
	@IsBoolean()
	@IsNotEmpty()
	draw: boolean;
	@IsNumber()
	@IsNotEmpty()
	score: number;
	@IsNumber()
	@IsNotEmpty()
	points: number;
}

export class MatchResultDto {
	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PlayerDto)
	Player1: PlayerDto;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => PlayerDto)
	Player2: PlayerDto;
}