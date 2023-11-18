import Joi from "joi";

export const ConfigSchema = Joi.object({
	DATABASE_URL: Joi.string()
		.required()
		.uri({
			scheme: ["postgresql"],
		}),

	REDIS_HOST: Joi.string().default("localhost"),
	REDIS_PORT: Joi.number().default(6379),

	SESSION_NAME: Joi.string().default("mawi"),
	SESSION_SECRET: Joi.string().required(),
	SESSION_COOKIE_AGE: Joi.number().default(1e3 * 60 * 15),

	FORTY_TWO_CLIENT_ID: Joi.string().required(),
	FORTY_TWO_CLIENT_SECRET: Joi.string().required(),
	FORTY_TWO_CLIENT_CALLBACK_URL: Joi.string()
		.uri({
			scheme: ["http", "https"],
		})
		.required(),
}).unknown(false);
