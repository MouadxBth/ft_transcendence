import { z } from "zod";

export const friendSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	avatar: z.string(),
});

export type FriendType = z.infer<typeof friendSchema>;
