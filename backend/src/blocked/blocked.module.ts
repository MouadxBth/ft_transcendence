import { Module } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { BlockedController } from "./blocked.controller";
import { BlockedCache } from "./blocked.cache";
import { UserModule } from "src/user/user.module";

@Module({
	imports: [UserModule],
	controllers: [BlockedController],
	providers: [BlockedService, BlockedCache],
	exports: [BlockedService],
})
export class BlockedModule {}
