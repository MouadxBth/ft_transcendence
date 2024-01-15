import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class MatchHistoryDto {
	@IsString()
	@IsOptional()
	map?: string;

	@IsString()
	@IsOptional()
	powerUp?: string;

	@IsNumber()
	@IsNotEmpty()
	time: number;

	@IsNumber()
	@IsNotEmpty()
	winningPoints: number;
}
