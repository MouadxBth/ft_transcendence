import z from "zod";

const googleProfileSchema = z.object({
	id: z.string(),
	displayName: z.string(),
	photos: z.array(
		z.object({
			value: z.string(),
		})
	),
	name: z
		.object({
			givenName: z.string().optional(),
			familyName: z.string().optional(),
		})
		.optional(),
});

export default googleProfileSchema;

export type GoogleUserProfile = z.infer<typeof googleProfileSchema>;
