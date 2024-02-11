import { z } from "zod";
import { userSchema } from "./user";

export const authenticatedUserSchema = z.object({
	user: userSchema,
	valid2Fa: z.boolean(),
});

export type AuthenticatedUser = z.infer<typeof authenticatedUserSchema>;
