import { z } from "zod";
import { conversationMemberSchema } from "./conversation-member";

export const conversationMessageSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	content: z.string(),
	sender: conversationMemberSchema,
	target: conversationMemberSchema,
});

export type ConversationMessageType = z.infer<typeof conversationMessageSchema>;
