import { ApiProperty } from "@nestjs/swagger";

export class DirectMessageMember {
	@ApiProperty({ description: "Username of the member", example: "janedoe" })
	username: string;

	@ApiProperty({ description: "Nickname of the member", example: "Jane" })
	nickname: string | null;

	@ApiProperty({
		description: "Avatar URL of the member",
		example: "https://example.com/jane_avatar.jpg",
	})
	avatar: string | null;

	@ApiProperty({ description: "First name of the member", example: "Jane" })
	firstName: string | null;

	@ApiProperty({ description: "Last name of the member", example: "Doe" })
	lastName: string | null;
}
