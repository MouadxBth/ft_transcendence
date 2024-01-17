import { z } from "zod";

export const friendSchema = z.object({
	nickname: z.string(),
	avatar: z.string(),
});

export type FriendType = z.infer<typeof friendSchema>;
