import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { RedisClient } from "./redis/redis.provider";
import session from "express-session";
import RedisStore from "connect-redis";
import passport from "passport";
import { RequestHandler } from "express";
import { WsSessionAdapter } from "./socket-io/ws-session.adapter";
import { useContainer } from "class-validator";

declare const module: any;

let sessionMiddleware: RequestHandler;

function configureApp(app: INestApplication<any>) {
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	app.setGlobalPrefix("api/v1");
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
}

function configureExpressSession(app: INestApplication<any>) {
	const configService = app.get(ConfigService);
	const redis = app.get<RedisClient>("REDIS_CLIENT");

	sessionMiddleware = session({
		name: configService.get<string>("SESSION_NAME"),
		secret: configService.get<string>("SESSION_SECRET")!,
		resave: true,
		saveUninitialized: false,
		store: new RedisStore({
			client: redis,
		}),
		cookie: {
			maxAge: configService.get<number>("SESSION_COOKIE_AGE"),
			httpOnly: true,
			sameSite: true,
		},
	});

	app.use(sessionMiddleware);
}

function configurePassport(app: INestApplication<any>) {
	app.use(passport.initialize());
	app.use(passport.session());
}

function configureWebsocketAdapter(app: INestApplication<any>) {
	app.useWebSocketAdapter(new WsSessionAdapter(sessionMiddleware, app));
}

function configureCors(app: INestApplication<any>) {
	app.enableCors({
		origin: "http://localhost:4000",
		credentials: true,
	});
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
	configureWebsocketAdapter(app);
	configureCors(app);
	configureSwagger(app);
	hotModuleReplacement(app);

	await app.listen(3000);
}
bootstrap();
