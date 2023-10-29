import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ConfigSchema } from "./config/config.schema";

@Module({
	imports: [
		PrismaModule,
		UserModule,
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			validationSchema: ConfigSchema,
		}),
	],
})
export class AppModule {}
