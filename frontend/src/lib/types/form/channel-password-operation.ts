import { z } from "zod";

export const channelPasswordOperationFormSchema = z
	.object({
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type ChannelPasswordOperationFormType = z.infer<typeof channelPasswordOperationFormSchema>;
