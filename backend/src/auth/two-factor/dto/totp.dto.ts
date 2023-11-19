import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, Matches } from "class-validator";

export class TimeBasedOneTimePasswordDto {
	@IsString()
	@IsNotEmpty()
	@Length(6, 6, { message: "TOTP must be 6 characters long" })
	@Matches(/^[^\s]+$/, { message: "TOTP cannot contain whitespaces" })
	@Matches(/^[0-9]+$/, {
		message: "TOTP can only contain numbers",
	})
	@ApiProperty({
		description: "The Time-Based One-Time Password of a user",
		example: "123456",
	})
	totp: string;
}
