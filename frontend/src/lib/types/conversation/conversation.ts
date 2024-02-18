import { z } from "zod";
import { conversationMemberSchema } from "./conversation-member";

export const conversationSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	sender: conversationMemberSchema,
	target: conversationMemberSchema,
});

export type ConversationType = z.infer<typeof conversationSchema>;
