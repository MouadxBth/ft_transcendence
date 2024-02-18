import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AdminOperationsDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Name of the channel",
		example: "general_channel",
	})
	member: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Username of the member to perform the operation on",
		example: "john_doe",
	})
	channel: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: "Username of the member to perform the operation on",
		example: "john_doe",
	})
	duration?: number;
}
