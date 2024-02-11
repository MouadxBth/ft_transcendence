import z from "zod";

const githubProfileSchema = z.object({
	username: z.string(),
	photos: z.array(
		z.object({
			value: z.string(),
		})
	),
	displayName: z.string(),
});

export default githubProfileSchema;

export type GithubUserProfile = z.infer<typeof githubProfileSchema>;
