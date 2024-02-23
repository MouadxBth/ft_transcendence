import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PasswordOperationsDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Password of the channel",
		example: "general_channel",
	})
	password: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Username of the member to perform the operation on",
		example: "john_doe",
	})
	channel: string;
}
