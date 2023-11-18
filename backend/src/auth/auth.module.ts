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
import { FortyTwoController } from "./forty-two/forty-two.controller";
import { FortyTwoService } from "./forty-two/forty-two.service";
import { FortyTwoGuard } from "./forty-two/guards/forty-two.guard";
import { FortyTwoStrategy } from "./forty-two/strategies/forty-two.strategy";
import { GithubController } from "./github/github.controller";
import { GithubService } from "./github/github.service";
import { GithubGuard } from "./github/guards/github.guard";
import { GithubStrategy } from "./github/strategies/github.strategy";
import { GoogleController } from "./google/google.controller";
import { GoogleService } from "./google/google.service";
import { GoogleGuard } from "./google/guards/google.guard";
import { GoogleStrategy } from "./google/strategies/google.strategy";

const controllers = [LocalController, FortyTwoController, GithubController, GoogleController];
const services = [LocalService, FortyTwoService, GithubService, GoogleService];
const guards = [AuthenticatedGuard, LocalGuard, FortyTwoGuard, GithubGuard, GoogleGuard];
const strategies = [LocalStrategy, FortyTwoStrategy, GithubStrategy, GoogleStrategy];

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
