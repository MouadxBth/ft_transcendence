import { z } from "zod";
import { channelMemberSchema } from "./channel-member";

export const channelMessageSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	content: z.string(),
	sender: channelMemberSchema,
	channel: z.string(),
});

export type ChannelMessageType = z.infer<typeof channelMessageSchema>;
