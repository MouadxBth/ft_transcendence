import { z } from "zod";

export const userSchema = z.object({
	username: z.string(),

	nickname: z.string().nullable(),

	firstTime: z.boolean(),

	firstName: z.string().nullable(),

	lastName: z.string().nullable(),

	avatar: z.string().nullable(),

	twoFactorAuthenticationFirstTime: z.boolean(),

	twoFactorAuthenticationEnabled: z.boolean(),
});

export type User = z.infer<typeof userSchema>;
