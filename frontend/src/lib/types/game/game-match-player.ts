import { z } from "zod";

export const gameMatchPlayerSchema = z.object({
	user: z.object({
		username: z.string(),

		nickname: z.string(),

		firstName: z.string(),

		lastName: z.string(),

		avatar: z.string(),
	}),
	winner: z.boolean(),
	draw: z.boolean(),
	score: z.number(),
});

export type GameMatchPlayerType = z.infer<typeof gameMatchPlayerSchema>;

export type GamePlayerStatus = "lobby" | "waiting" | "started";
