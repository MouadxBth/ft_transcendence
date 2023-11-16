import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalController } from "./local/local.controller";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthenticatedGuard } from "./guards/authenticated.guard";
import { LocalGuard } from "./local/guards/local.guard";
import { LocalService } from "./local/local.service";
import { LocalStrategy } from "./local/strategies/local.strategy";
import { SessionSerializer } from "./utilities/session.serializer";

const controllers = [LocalController];
const services = [LocalService];
const guards = [AuthenticatedGuard, LocalGuard];
const strategies = [LocalStrategy];

@Module({
	imports: [
		forwardRef(() => UserModule),
		PassportModule.register({
			session: true,
		}),
	],
	controllers: [AuthController, ...controllers],
	providers: [AuthService, SessionSerializer, ...services, ...guards, ...strategies],
	exports: [AuthenticatedGuard],
})
export class AuthModule {}
