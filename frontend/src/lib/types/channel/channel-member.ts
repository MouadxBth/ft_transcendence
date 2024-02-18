import { z } from "zod";
import { channelUserSchema } from "./channel-user";

export const channelMemberSchema = z.object({
	user: channelUserSchema,
	admin: z.boolean(),
	muted: z.boolean(),
});

export type ChannelMemberType = z.infer<typeof channelMemberSchema>;
