import { z } from "zod";

export const registerFormSchema = z
	.object({
		username: z.string().min(5).max(50),
		firstName: z.string().min(1).max(50),
		lastName: z.string().min(1).max(50),
		password: z.string().min(8).max(50),
		confirmPassword: z.string().min(8).max(50),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

export type RegisterFormType = z.infer<typeof registerFormSchema>;
