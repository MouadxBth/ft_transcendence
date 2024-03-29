import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsNumber, IsOptional, IsString, IsUrl, Length, Matches } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Used to enable/disable 2FA (Two Factor Authentication), by default, it's false",
		example: true,
	})
	twoFactorAuthenticationEnabled?: boolean;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description:
			"Used as a check for accessing the QR Code 2FA (Two Factor Authentication), by default, it's true",
		example: true,
	})
	twoFactorAuthenticationFirstTime?: boolean;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: "This represents the 2FA secret of a user",
		example: "aAbBcCdD$123456987daz",
		nullable: true,
	})
	twoFactorAuthenticationSecret?: string | null;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Used as a status check to set a nickname, by default, it's true",
		example: true,
	})
	firstTime?: boolean;

	@IsString()
	@IsOptional()
	@Length(3, 20, { message: "Nickname must be between 3 and 20 characters" })
	@Matches(/^[^\s]+$/, { message: "Nickname cannot contain whitespaces" })
	@ApiProperty({
		description: "This represents the nickname of a user",
		example: "Gojo",
		nullable: true,
	})
	nickname?: string | null;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: "This represents the level of a user",
		example: 19,
		nullable: true,
	})
	level?: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: "This represents the experience of a user",
		example: 420,
		nullable: true,
	})
	experience?: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty({
		description: "This represents the elo rating of a user",
		example: 420,
		nullable: true,
	})
	eloRating?: number;

	@IsString({ message: "Banner URL must be a string" })
	@IsOptional()
	@IsUrl({}, { message: "Invalid banner URL format" })
	@ApiProperty({
		description: "Represents a URL to the banner of a user",
		example: "https://images.alphacoders.com/131/thumb-1920-1312794.png",
		nullable: true,
	})
	banner?: string | null;
}
