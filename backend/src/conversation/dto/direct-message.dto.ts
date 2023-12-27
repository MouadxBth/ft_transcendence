import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class DirectMessageDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: String, description: "Target username", example: "mbouthai" })
	target: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: String, description: "Content of the direct message", example: "Gucci" })
	content: string;
}
