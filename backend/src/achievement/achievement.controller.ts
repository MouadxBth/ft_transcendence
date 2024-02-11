import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ApiTags, ApiOkResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Achievement")
@Controller("achievement")
@UseGuards(AuthenticatedGuard)
export class AchievementController {
	constructor(private readonly achievementService: AchievementService) {}

	@Get("/")
	@ApiOkResponse({
		description: "Returns a list of all achievements.",
	})
	async findAll() {
		return this.achievementService.findAll();
	}

	@Get("/:target")
	@ApiOkResponse({
		description: "Returns achievements unlocked by a specific user.",
	})
	@ApiParam({
		name: "target",
		description: "Username of the target user.",
		required: true,
		type: String,
	})
	async findOf(@Param("target") target: string) {
		return this.achievementService.findOf(target);
	}
}
