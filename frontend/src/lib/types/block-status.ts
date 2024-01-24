import { z } from "zod";

export const blockStatusSchema = z.object({
	senderId: z.string(),
	senderNickname: z.string(),
	targetId: z.string(),
	targetNickname: z.string(),
	blocking: z.boolean(),
	blockedBy: z.boolean(),
});

export type BlockStatusType = z.infer<typeof blockStatusSchema>;
