import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class GameRequestDto {
	@IsString()
	@IsNotEmpty()
	target: string;

	@IsBoolean()
	superMatch: boolean;
}
