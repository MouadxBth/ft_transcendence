import { ApiProperty } from "@nestjs/swagger";

/**
 * Represents a member of a conversation.
 */
export class ConversationMember {
	@ApiProperty({
		description: "Username of the conversation member.",
		example: "john_doe",
	})
	username: string;

	@ApiProperty({
		description: "Nickname of the conversation member (nullable).",
		example: "Johnny",
		required: false,
	})
	nickname: string | null;

	@ApiProperty({
		description: "First name of the conversation member (nullable).",
		example: "John",
		required: false,
	})
	firstName: string | null;

	@ApiProperty({
		description: "Last name of the conversation member (nullable).",
		example: "Doe",
		required: false,
	})
	lastName: string | null;

	@ApiProperty({
		description: "URL of the conversation member's avatar (nullable).",
		example: "https://example.com/avatar.jpg",
		required: false,
	})
	avatar: string | null;
}
