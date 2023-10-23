import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix("api/v1");
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
