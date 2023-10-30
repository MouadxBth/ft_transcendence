import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

declare const module: any;

function configureApp(app: INestApplication<any>) {
	app.setGlobalPrefix("api/v1");
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
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
	configureSwagger(app);
	hotModuleReplacement(app);

	await app.listen(3000);
}
bootstrap();
