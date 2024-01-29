import { z } from "zod";
import { authenticatedUserSchema } from "./user/authenticated-user";

export const errorSchema = z.object({
	authenticatedUser: authenticatedUserSchema,
	message: z.string(),
});

export type ErrorType = z.infer<typeof errorSchema>;
