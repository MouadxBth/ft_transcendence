import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsBoolean()
	@IsOptional()
	@ApiProperty({
		description: "Used to enable/disable 2FA (Two Factor Authentication), by default, it's false",
		example: true,
	})
	twoFactorAuthenticationEnabled?: boolean;
}
