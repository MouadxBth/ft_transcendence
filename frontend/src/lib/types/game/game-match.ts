import { z } from "zod";
import { gameMatchPlayerSchema } from "./game-match-player";

export const gameMatchSchema = z.object({
	id: z.number(),

	createdAt: z.string(),

	type: z.string(),

	player1: gameMatchPlayerSchema.optional(),

	player2: gameMatchPlayerSchema.optional(),
});

export type GameMatchType = z.infer<typeof gameMatchSchema>;
