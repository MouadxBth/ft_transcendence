import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, Length, Matches, IsUrl } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@Length(3, 20, { message: "Username must be between 3 and 20 characters" })
	@Matches(/^[^\s]+$/, { message: "Username cannot contain whitespaces" })
	@Matches(/^[a-zA-Z0-9_]+$/, {
		message: "Username can only contain letters, numbers, and underscores",
	})
	@ApiProperty({
		description: "This is the unique identifier of a user",
		example: "mbouthai",
		nullable: true,
	})
	username: string;

	@IsString()
	@IsOptional()
	@Length(8, 30, { message: "Password must be between 8 and 30 characters" })
	@Matches(/^[^\s]+$/, { message: "Password cannot contain whitespaces" })
	@ApiProperty({
		description: "This is the password of a user",
		example: "SwaggerBoy123",
		nullable: true,
	})
	password?: string | null;

	@IsString()
	@Length(3, 30, { message: "First name must be between 3 and 30 characters" })
	@Matches(/^[^\s]+$/, { message: "First name cannot contain whitespaces" })
	@IsOptional()
	@ApiProperty({
		description: "Represents the first name of a user",
		example: "Mouad",
		nullable: true,
	})
	firstName?: string | null;

	@IsString()
	@Length(3, 30, { message: "Last name must be between 3 and 30 characters" })
	@Matches(/^[^\s]+$/, { message: "Last name cannot contain whitespaces" })
	@IsOptional()
	@ApiProperty({
		description: "Represents the last name of a user",
		example: "Bouthaich",
		nullable: true,
	})
	lastName?: string | null;

	@IsString({ message: "Avatar URL must be a string" })
	@IsOptional()
	@IsUrl({}, { message: "Invalid avatar URL format" })
	@ApiProperty({
		description: "Represents a URL to the avatar of a user",
		example: "https://images.alphacoders.com/131/thumb-1920-1312794.png",
		nullable: true,
	})
	avatar?: string | null;
}
