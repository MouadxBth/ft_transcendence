import { z } from "zod";

export const gameRequestPlayerSchema = z.object({
	username: z.string(),

	nickname: z.string(),

	firstName: z.string(),

	lastName: z.string(),

	avatar: z.string(),

	eloRating: z.number(),

	level: z.number(),

	rank: z.number().optional(),
});

export type GameRequestPlayerType = z.infer<typeof gameRequestPlayerSchema>;
