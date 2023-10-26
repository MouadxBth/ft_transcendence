import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "mbouthai" })
	username: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty({ example: "123456" })
	password: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Mouad" })
	firstName: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Bouthaich" })
	lastName: string;

	@IsEmail()
	@IsNotEmpty()
	@ApiProperty({ example: "mouad.bouthaich@gmail.com" })
	email: string;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "TODO: implement this" })
	avatar: string;
}
