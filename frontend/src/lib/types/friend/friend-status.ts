import { z } from "zod";

export const friendStatusSchema = z.object({
	friends: z.boolean(),
	sentRequest: z.boolean(),
	receivedRequest: z.boolean(),
});

export type FriendStatusType = z.infer<typeof friendStatusSchema>;
