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

// create a match-history
// fetch a match-history by id
// fetch all match-histories for a certain user
// delete a match-history by id
// add the match-histroy's members after the match is done 
