import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "mbouthai" })
	username: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Mouad" })
	firstName: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Bouthaich" })
	lastName: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "TODO: implement this" })
	avatar: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "TODO: implement this" })
	twoFactorAuthenticationSecret: string | undefined;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({ example: "TODO: implement this" })
	twoFactorAuthenticationEnabled: boolean;
}
