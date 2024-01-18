import { z } from 'zod'


export const DirectMessageApiResponseSchema = z.array(
	z.object({
		id: z.number(),
		content: z.string(),
		senderId: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		read: z.boolean(),
	})
)
export type DirectMessageApiResponse = z.infer<typeof DirectMessageApiResponseSchema>;