import { z } from 'zod'

export const ChannelApiResponseSchema = z.object({
	name: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	topic: z.string().nullable(),
	ownerId: z.string(),
	status: z.enum(["PRIVATE", "PUBLIC", "PROTECTED"]),
})

export const ChannelListApiResponseSchema = z.array(
	ChannelApiResponseSchema
)


export const ChannelDmItemSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
	content: z.string(),
	senderId: z.string(),
})

export const ChannelUserApiResponseSchema = z.object({
	id: z.number(),
    admin: z.boolean(),
    muted: z.boolean(),
    userId: z.string(),
    channelId: z.string(),
})

export  const ChannelUserListApiResponseSchema = z.array(
	ChannelUserApiResponseSchema
)

export type ChannelUserApiResponse = z.infer<typeof ChannelUserApiResponseSchema>
export type ChannelUserListApiResponse = z.infer<typeof ChannelUserListApiResponseSchema>

export type ChannelDmItem = z.infer<typeof ChannelDmItemSchema>;

export const ChannelDmApiResponseSchema = z.object({
	messages: z.array(
		ChannelDmItemSchema
	)
})

export type ChannelDmApiResponse = z.infer<typeof ChannelDmApiResponseSchema>;

export type ChannelListApiResponse = z.infer<typeof ChannelListApiResponseSchema>;
export type ChannelApiResponse = z.infer<typeof ChannelApiResponseSchema>;