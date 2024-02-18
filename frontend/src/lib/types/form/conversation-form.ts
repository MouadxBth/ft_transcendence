import { z } from "zod";

export const conversationFormSchema = z.object({
	target: z.string().refine((value) => value.trim() !== "", {
		message: "Target must be a non-empty string",
	}),
});

export type ConversationFormType = z.infer<typeof conversationFormSchema>;
