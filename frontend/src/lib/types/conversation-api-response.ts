import { z } from 'zod'


export const ConversationApiResponseSchema = z.array(
	z.object({
		id: z.number(),
		createdAt: z.string(),
		updatedAt: z.string(),
		members: z.array(
			z.object({
				username: z.string(),
			})
		)
	})
)

export type ConversationApiResponse = z.infer<typeof ConversationApiResponseSchema>;