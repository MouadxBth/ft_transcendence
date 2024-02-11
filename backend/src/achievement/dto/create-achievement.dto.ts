import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAchievementDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ type: String, description: "Achievement's name", example: "Super Star" })
	name: string;

	@IsString()
	@IsOptional()
	@ApiProperty({
		type: String,
		description: "A brief explanation of the achievement",
		example: "You are a super star! Shine bright!",
	})
	brief?: string | null;

	@IsString()
	@IsOptional()
	@ApiProperty({
		type: String,
		description: "A detailed description of the achievement",
		example: "You have gained 16 followers, you have made it!",
	})
	description?: string | null;
}
