import { z } from "zod";

const userInfoSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	avatar: z.string(),
});

export const friendRequestSchema = z.object({
	createdAt: z.string(),
	sender: userInfoSchema,
	target: userInfoSchema,
});

export type FriendRequestType = z.infer<typeof friendRequestSchema>;
