import z from "zod";

const fortyTwoProfileSchema = z.object({
	username: z.string(),
	_json: z.object({
		image: z.object({
			link: z.string().optional(),
		}),
	}),
	name: z
		.object({
			givenName: z.string().optional(),
			familyName: z.string().optional(),
		})
		.optional(),
	displayName: z.string(),
});

export default fortyTwoProfileSchema;

export type FortyTwoUserProfile = z.infer<typeof fortyTwoProfileSchema>;
