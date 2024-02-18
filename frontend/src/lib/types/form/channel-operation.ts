import { z } from "zod";

export const channelOperationFormSchema = z.object({
	nickname: z.string().min(3).max(50),
});

export type ChannelOperationFormType = z.infer<typeof channelOperationFormSchema>;

export const channelMuteOperationFormSchema = z.object({
	nickname: z.string().min(3).max(50),
	duration: z.string().refine(
		(value) => {
			const parsedValue = parseInt(value, 10);
			return Number.isInteger(parsedValue) && parsedValue > 0;
		},
		{
			message: "Duration must be a positive integer and not zero",
		}
	),
});

export type ChannelMuteOperationFormType = z.infer<typeof channelMuteOperationFormSchema>;
