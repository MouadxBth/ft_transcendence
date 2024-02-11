import { z } from "zod";
import { achievementSchema } from "./achievement";

export const achievementUpdateSchema = z.object({
	username: z.string(),
	nickname: z.string(),
	avatar: z.string(),
	latest: achievementSchema,
	achievements: z.array(achievementSchema),
});

export type AchievementsUpdateType = z.infer<typeof achievementUpdateSchema>;
