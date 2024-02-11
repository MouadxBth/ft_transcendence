import { z } from "zod";
import { friendSchema } from "./friend";

export const friendsUpdateSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	avatar: z.string(),
	friends: z.array(friendSchema),
});

export type FriendsUpdateType = z.infer<typeof friendsUpdateSchema>;
