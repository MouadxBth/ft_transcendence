import { z } from "zod";

export const userSchema = z.object({
	username: z.string(),

	nickname: z.string().nullable(),

	firstTime: z.boolean(),

	firstName: z.string(),

	lastName: z.string(),

	avatar: z.string(),

	banner: z.string().nullable(),

	twoFactorAuthenticationFirstTime: z.boolean(),

	twoFactorAuthenticationEnabled: z.boolean(),

	level: z.number(),

	experience: z.number(),

	eloRating: z.number(),
});

export type User = z.infer<typeof userSchema>;
