import { z } from "zod";
import { gameRequestPlayerSchema } from "./game-request-player";

export const gameRequestSchema = z.object({
	matchId: z.number().optional(),

	superMatch: z.boolean(),

	sender: gameRequestPlayerSchema,

	target: gameRequestPlayerSchema,
});

export type GameRequestType = z.infer<typeof gameRequestSchema>;
