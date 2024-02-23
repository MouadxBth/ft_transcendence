// username: string;
//     nickname: string | null;
//     firstName: string | null;
//     lastName: string | null;
//     avatar: string | null;
//     eloRating: number;

import { z } from "zod";

export const leaderboardMemberSchema = z.object({
	username: z.string(),

	nickname: z.string().nullable(),

	firstName: z.string(),

	lastName: z.string(),

	avatar: z.string(),

	eloRating: z.number(),

	rank: z.number().optional(),
});

export type LeaderboardMemberType = z.infer<typeof leaderboardMemberSchema>;
