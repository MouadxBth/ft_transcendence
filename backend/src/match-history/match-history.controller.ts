import { Controller, Get, HttpException, HttpStatus, Param, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { MatchHistoryService } from "./match-history.service";
import { ApiTags, ApiOkResponse, ApiParam } from "@nestjs/swagger";

@ApiTags("Match History")
@Controller("match-history")
@UseGuards(AuthenticatedGuard)
export class MatchHistoryController {
	constructor(private readonly matchHistoryService: MatchHistoryService) {}

	@Get(":id")
	@ApiOkResponse({
		description: "Returns details of a specific match history.",
	})
	@ApiParam({
		name: "id",
		description: "ID of the match history.",
		required: true,
		type: Number,
	})
	async findOne(@Param("id") id: string) {
		const parsedId = parseInt(id);

		if (Number.isNaN(parsedId))
			throw new HttpException("Invalid id parameter value!", HttpStatus.BAD_REQUEST);
		return await this.matchHistoryService.findOne(parsedId);
	}

	@Get("player/:username")
	@ApiOkResponse({
		description: "Returns a list of match histories for a specific player.",
	})
	@ApiParam({
		name: "username",
		description: "Username of the player.",
		required: true,
		type: String,
	})
	async findAll(@Param("username") username: string) {
		return await this.matchHistoryService.findAll(username);
	}
}
