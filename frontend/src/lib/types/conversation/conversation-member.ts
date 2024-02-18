import { z } from "zod";

export const conversationMemberSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	avatar: z.string(),
	firstName: z.string(),
	lastName: z.string(),
});

export type ConversationMemberType = z.infer<typeof conversationMemberSchema>;
