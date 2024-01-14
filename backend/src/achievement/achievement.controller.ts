import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AchievementService } from "./achievement.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";

@Controller("achievement")
@UseGuards(AuthenticatedGuard)
export class AchievementController {
	constructor(private readonly achievementService: AchievementService) {}

	@Get("/")
	async findAll() {
		return this.achievementService.findAll();
	}

	@Get("/:target")
	async findOf(@Param("target") target: string) {
		return this.achievementService.findOf(target);
	}
}
