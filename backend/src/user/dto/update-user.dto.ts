import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Used to enable/disable 2FA (Two Factor Authentication), by default, it's false",
		example: true,
	})
	twoFactorAuthenticationEnabled?: boolean;

	@IsString()
	@IsOptional()
	@ApiProperty({
		description: "This represents the 2FA secret of a user",
		example: "aAbBcCdD$123456987daz",
		nullable: true,
	})
	twoFactorAuthenticationSecret?: string | null;
}
