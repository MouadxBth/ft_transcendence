import Joi from "joi";

export const ConfigSchema = Joi.object({
	DATABASE_URL: Joi.string()
		.required()
		.uri({
			scheme: ["postgresql"],
		}),
	REDIS_HOST: Joi.string().default("redis"),
	REDIS_PORT: Joi.number().default(6379),
	SESSION_SECRET: Joi.string().required(),
	SESSION_COOKIE_AGE: Joi.number().default(1e3 * 60 * 15),
}).unknown(false);
