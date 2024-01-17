import { z } from "zod";

export const matchHistorySchema = z.object({
	nickname: z.string(),
	firstAvatar: z.string(),
	secondAvatar: z.string(),
	won: z.boolean(),
});

export type MatchHistoryType = z.infer<typeof matchHistorySchema>;
