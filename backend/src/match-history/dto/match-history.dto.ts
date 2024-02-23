import { IsBoolean, IsOptional } from "class-validator";

export class MatchHistoryDto {
	@IsBoolean()
	@IsOptional()
	super?: boolean;
}
