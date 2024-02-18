import { z } from "zod";

export const channelUserSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	avatar: z.string(),
});

export type ChannelUserType = z.infer<typeof channelUserSchema>;
