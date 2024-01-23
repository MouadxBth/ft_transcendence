import { z } from 'zod'


export const ChannelApiResponseSchema = z.array(
	z.object({
		name: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		topic: z.string().nullable(),
		ownerId: z.string(),
		status: z.string(),
	})
)

export const ChannelDmItemSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	content: z.string(),
	senderId: z.string(),
})

export type ChannelDmItem = z.infer<typeof ChannelDmItemSchema>;

export const ChannelDmApiResponseSchema = z.object({
	messages: z.array(
		ChannelDmItemSchema
	)
})

export type ChannelDmApiResponse = z.infer<typeof ChannelDmApiResponseSchema>;

export type ChannelApiResponse = z.infer<typeof ChannelApiResponseSchema>;