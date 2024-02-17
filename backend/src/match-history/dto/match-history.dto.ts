import { IsOptional, IsString } from "class-validator";

export class MatchHistoryDto {
	@IsString()
	@IsOptional()
	map?: string;

	@IsString()
	@IsOptional()
	powerUp?: string;

}
