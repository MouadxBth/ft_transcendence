import { ApiProperty } from "@nestjs/swagger";
import { DirectMessageMember } from "./direct-message-member.entity";

export class DirectMessage {
	@ApiProperty({ description: "ID of the direct message", example: 1 })
	id: number;

	@ApiProperty({
		description: "Timestamp of when the message was created",
		example: "2022-02-17T12:34:56Z",
	})
	createdAt: Date;

	@ApiProperty({ description: "Content of the direct message", example: "Hello, how are you?" })
	content: string;

	@ApiProperty({
		type: DirectMessageMember,
		description: "Information about the sender",
		example: {
			username: "johndoe",
			nickname: "John",
			avatar: "https://example.com/avatar.jpg",
			firstName: "John",
			lastName: "Doe",
		},
	})
	sender: DirectMessageMember;

	@ApiProperty({
		type: [DirectMessageMember],
		description: "Information about members in the conversation",
		example: [
			{
				username: "janedoe",
				nickname: "Jane",
				avatar: "https://example.com/jane_avatar.jpg",
				firstName: "Jane",
				lastName: "Doe",
			},
		],
	})
	members: DirectMessageMember[];
}
