import Joi from "joi";

export const ConfigSchema = Joi.object({
	DATABASE_URL: Joi.string()
		.required()
		.uri({
			scheme: ["postgresql"],
		}),
	REDIS_HOST: Joi.string().default("localhost"),
	REDIS_PORT: Joi.number().default(6379),
}).unknown(false);
