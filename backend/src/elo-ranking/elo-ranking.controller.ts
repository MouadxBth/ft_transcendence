import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { EloRankingService } from "./elo-ranking.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";

@Controller("elo")
@UseGuards(AuthenticatedGuard)
export class EloRankingController {
	constructor(private readonly eloRankingService: EloRankingService) {}

	@Get("leaderboard")
	async leaderboard() {
		return await this.eloRankingService.leaderboard();
	}

	@Get(":username")
	async getEloRating(@Param("username") username: string) {
		return await this.eloRankingService.getEloRating(username);
	}
}
