import { ApiProperty } from "@nestjs/swagger";

export class User {
	@ApiProperty({
		description: "This is the unique identifier of a user",
		example: "mbouthai",
		nullable: true,
	})
	username: string;

	@ApiProperty({
		description: "Used as a status check to set a nickname, by default, it's true",
		example: true,
	})
	firstTime: boolean;

	@ApiProperty({
		description: "This represents the nickname of a user",
		example: "Gojo",
		nullable: true,
	})
	nickname: string | null;

	@ApiProperty({
		description: "Represents the first name of a user",
		example: "Mouad",
		nullable: true,
	})
	firstName: string | null;

	@ApiProperty({
		description: "Represents the last name of a user",
		example: "Bouthaich",
		nullable: true,
	})
	lastName: string | null;

	@ApiProperty({
		description: "Represents a URL to the avatar of a user",
		example: "https://images.alphacoders.com/131/thumb-1920-1312794.png",
		nullable: true,
	})
	avatar: string | null;

	@ApiProperty({
		description: "This represents the level of a user",
		example: 19,
		nullable: true,
	})
	level: number;

	@ApiProperty({
		description: "This represents the experience of a user",
		example: 420,
		nullable: true,
	})
	experience: number;

	@ApiProperty({
		description: "This represents the elo rating of a user",
		example: 19,
		nullable: true,
	})
	eloRating: number;

	@ApiProperty({
		description: "Used to enable/disable 2FA (Two Factor Authentication), by default, it's false",
		example: true,
	})
	twoFactorAuthenticationEnabled: boolean;

	@ApiProperty({
		description:
			"Used as a check for accessing the QR Code 2FA (Two Factor Authentication), by default, it's true",
		example: true,
	})
	twoFactorAuthenticationFirstTime: boolean;
}
