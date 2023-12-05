import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateDirectMessageDto {
	@IsNumber()
	@IsDefined()
	@ApiProperty({ type: Number, description: "ID of the direct message", example: 1 })
	id: number;

	@IsString()
	@IsOptional()
	@ApiProperty({
		type: String,
		required: false,
		description: "Updated content of the direct message",
		example: "Life is Gucci",
	})
	content?: string;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		type: Boolean,
		required: false,
		description: "Updated read status of the direct message",
		example: true,
	})
	read?: boolean;
}
