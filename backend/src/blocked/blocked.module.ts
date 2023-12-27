import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { BlockedController } from "./blocked.controller";
import { BlockedCache } from "./blocked.cache";
import { UserModule } from "src/user/user.module";
import { TwoFactorMiddleware } from "src/auth/two-factor/middleware/two-factor.middleware";

@Module({
	imports: [UserModule],
	controllers: [BlockedController],
	providers: [BlockedService, BlockedCache],
	exports: [BlockedService],
})
export class BlockedModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TwoFactorMiddleware).forRoutes(BlockedController);
	}
}
