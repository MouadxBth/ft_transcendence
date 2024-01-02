import { Controller, Delete, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { MatchHistoryService } from "./match-history.service";

@Controller("match-history")
@UseGuards(AuthenticatedGuard)
export class MatchHistoryController {
	constructor(private readonly matchHistoryService: MatchHistoryService) {}

	@Get(":id")
	async findOne(@Param("id", ParseIntPipe) id: number) {
		return await this.matchHistoryService.findOne(id);
	}
	@Get("player/:username")
	async findAll(@Param("username") username: string) {
		return await this.matchHistoryService.findAll(username);
	}
	@Delete(":id")
	async delete(@Param("id", ParseIntPipe) id: number) {
		return await this.matchHistoryService.delete(id);
	}
}
