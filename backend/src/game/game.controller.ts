import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GameService } from "./game.service";
import { type Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@ApiTags("Game")
@Controller("game")
@UseGuards(AuthenticatedGuard)
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get("/request/sent")
	@ApiOkResponse({ description: "Game requests retrieved successfully." })
	async sent(@Req() request: Request) {
		return this.gameService.getSentRequest((request.user! as AuthenticatedUser).user.username);
	}

	@Get("/request/received")
	@ApiOkResponse({ description: "Game requests retrieved successfully." })
	async received(@Req() request: Request) {
		return this.gameService.getReceivedRequests((request.user! as AuthenticatedUser).user.username);
	}
}
