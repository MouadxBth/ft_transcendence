import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

export class AuthenticatedUser {
	@ApiProperty({
		description: "This is the user instance",
		example: {
			username: "mouad",
			firstName: "Mouad",
			lastName: "Bouthaich",
		} as User,
		nullable: true,
	})
	user: User;

	@ApiProperty({
		description: "This represents the status of the Two-Factor Authentication code verification",
		example: false,
	})
	valid2Fa: boolean;
}
