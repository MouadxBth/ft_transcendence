import { ApiProperty } from "@nestjs/swagger";

export class User {
	@ApiProperty({ example: "mbouthai" })
	username: string;

	@ApiProperty({ example: "123456" })
	password: string;

	@ApiProperty({ example: "Mouad" })
	firstName: string | null;

	@ApiProperty({ example: "Bouthaich" })
	lastName: string | null;

	@ApiProperty({ example: "mouad.bouthaich@gmail.com" })
	email: string | null;

	@ApiProperty({ example: "TODO: implement this" })
	avatar: string | null;
}
