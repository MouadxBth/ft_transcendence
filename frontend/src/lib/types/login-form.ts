import { z } from "zod";

export const loginFormSchema = z.object({
	username: z.string().min(5).max(50),
	password: z.string().min(8).max(50),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
