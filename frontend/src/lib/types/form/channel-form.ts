import { z } from "zod";

export const channelFormSchema = z.object({
	name: z.string().min(3).max(50),
	password: z.string().min(8).max(50).optional(),
	topic: z.string().optional(),
	status: z.string().optional(),
});

export type ChannelFormType = z.infer<typeof channelFormSchema>;
