import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { RedisClient } from "./redis/redis.provider";
import session from "express-session";
import RedisStore from "connect-redis";
import * as passport from "passport";

declare const module: any;

function configureApp(app: INestApplication<any>) {
	app.setGlobalPrefix("api/v1");
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
}

function configureExpressSession(app: INestApplication<any>) {
	const configService = app.get(ConfigService);
	const redis = app.get<RedisClient>("REDIS_CLIENT");

	app.use(
		session({
			name: configService.get<string>("SESSION_NAME"),
			secret: configService.get<string>("SESSION_SECRET")!,
			resave: false,
			saveUninitialized: false,
			store: new RedisStore({
				client: redis,
			}),
			cookie: {
				maxAge: configService.get<number>("SESSION_COOKIE_AGE"),
				httpOnly: true,
				sameSite: true,
			},
		})
	);
}

function configurePassport(app: INestApplication<any>) {
	app.use(passport.initialize());
	app.use(passport.session());
}

function configureSwagger(app: INestApplication<any>) {
	const config = new DocumentBuilder()
		.setTitle("ft_transcendence")
		.setDescription("The official ft_transcendence API documentation.")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("doc", app, document);
}

function hotModuleReplacement(app: INestApplication<any>) {
	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	configureApp(app);
	configureExpressSession(app);
	configurePassport(app);
	configureSwagger(app);
	hotModuleReplacement(app);

	await app.listen(3000);
}
bootstrap();
