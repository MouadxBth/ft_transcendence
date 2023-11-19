import { MiddlewareConsumer, Module, NestModule, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes(UserController);
	}
}
