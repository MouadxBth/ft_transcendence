import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { OnlineStatusService } from "./online-status.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Online Status")
@Controller("online-status")
@UseGuards(AuthenticatedGuard)
export class OnlineStatusController {
	constructor(private readonly onlineStatusService: OnlineStatusService) {}

	@Get("/:target")
	@ApiOkResponse({ description: "Online status retrieved successfully." })
	async onlineStatus(@Param("target") target: string) {
		return this.onlineStatusService.onlineStatus(target);
	}
}
