import { Module, forwardRef } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [forwardRef(() => AuthModule)],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
