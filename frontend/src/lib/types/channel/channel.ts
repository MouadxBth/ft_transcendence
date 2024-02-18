import { z } from "zod";
import { channelMemberSchema } from "./channel-member";
import { channelUserSchema } from "./channel-user";

export const channelSchema = z.object({
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: z.string(),
	topic: z.string().nullable(),
	owner: channelUserSchema,
	members: z.array(channelMemberSchema),
});

export type ChannelType = z.infer<typeof channelSchema>;
