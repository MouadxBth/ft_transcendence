import { z } from "zod";

export const levelSchema = z.object({
	level: z.number(),

	experience: z.number(),

	required: z.number(),
});

export type LevelType = z.infer<typeof levelSchema>;
