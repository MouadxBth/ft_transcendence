import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class JoinChannelDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "Name of the channel",
		example: "general_channel",
	})
	channel: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: "Password for the channel (optional)",
		example: "secretpassword",
		required: false,
	})
	password?: string | null;
}
