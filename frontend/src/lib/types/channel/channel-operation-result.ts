import { z } from "zod";

export const channelOperationResultSchema = z.object({
	channel: z.string(),
	sender: z.string(),
	duration: z.number().optional(),
});

export type ChannelOperationResultType = z.infer<typeof channelOperationResultSchema>;
