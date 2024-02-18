import { ApiProperty } from "@nestjs/swagger";
import { ConversationMember } from "./conversation-member.entity";

export class Conversation {
	@ApiProperty({
		description: "Unique identifier for the conversation.",
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: "Timestamp when the conversation was created.",
		example: new Date(),
	})
	createdAt: Date;

	@ApiProperty({
		description: "Details of the user initiating the conversation.",
		type: ConversationMember,
	})
	sender: ConversationMember;

	@ApiProperty({
		description: "Details of the user receiving the conversation.",
		type: ConversationMember,
	})
	target: ConversationMember;
}
