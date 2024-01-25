import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { EloRankingService } from "./elo-ranking.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ApiTags, ApiOkResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Elo")
@Controller("elo")
@UseGuards(AuthenticatedGuard)
export class EloRankingController {
	constructor(private readonly eloRankingService: EloRankingService) {}

	@Get("leaderboard")
	@ApiOkResponse({
		description: "Returns the leaderboard of users.",
	})
	async leaderboard() {
		return await this.eloRankingService.leaderboard();
	}

	@Get("ranking/:target")
	@ApiOkResponse({
		description: "Returns the Elo ranking information for a specific user.",
	})
	@ApiParam({
		name: "target",
		description: "Username of the target user.",
		required: true,
		type: String,
	})
	async getEloRating(@Param("target") target: string) {
		return await this.eloRankingService.getEloRanking(target);
	}
}
