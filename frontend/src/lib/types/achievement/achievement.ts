import { z } from "zod";

export const achievementSchema = z.object({
	name: z.string(),
	unlockedAt: z.string(),
	brief: z.string().optional(),
	description: z.string().optional(),
});

export type AchievementType = z.infer<typeof achievementSchema>;
