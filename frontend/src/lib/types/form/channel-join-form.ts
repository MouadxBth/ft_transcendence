import { z } from "zod";

export const channelJoinFormSchema = z.object({
	channel: z.string({
		required_error: "Please select a channel.",
	}),
	password: z.string().min(8).max(50).optional(),
});

export type ChannelJoinFormType = z.infer<typeof channelJoinFormSchema>;
