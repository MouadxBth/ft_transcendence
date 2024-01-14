import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

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
}
