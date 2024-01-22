import { Controller, Get, HttpException, HttpStatus, Query, UseGuards } from "@nestjs/common";
import { LevelService } from "./level.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import {
	ApiBadRequestResponse,
	ApiOkResponse,
	ApiOperation,
	ApiQuery,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Level")
@Controller("level")
@UseGuards(AuthenticatedGuard)
export class LevelController {
	constructor(private readonly levelService: LevelService) {}

	@Get()
	@ApiOperation({ summary: "Calculate experience for a given level." })
	@ApiQuery({
		name: "level",
		type: Number,
		description: "The level for which to calculate experience.",
	})
	@ApiOkResponse({
		description: "Successfully calculated experience for the specified level.",
	})
	@ApiBadRequestResponse({
		description: "Invalid level query value.",
	})
	calculateLevelExperience(@Query("level") level: string) {
		const parsedLevel = parseInt(level);

		if (Number.isNaN(parsedLevel))
			throw new HttpException("Invalid level query value!", HttpStatus.BAD_REQUEST);
		return this.levelService.calculateLevelExperience(parsedLevel);
	}

	@Get("/required")
	@ApiOperation({
		summary: "Calculate required experience for a given level and current experience.",
	})
	@ApiQuery({
		name: "level",
		type: Number,
		description: "The level for which to calculate required experience.",
	})
	@ApiQuery({
		name: "experience",
		type: Number,
		description: "The current experience points.",
	})
	@ApiOkResponse({
		description:
			"Successfully calculated required experience for the specified level and current experience.",
	})
	@ApiBadRequestResponse({
		description: "Invalid level or experience query value.",
	})
	calculateRequiredExperience(
		@Query("level") level: string,
		@Query("experience") experience: string
	) {
		const parsedLevel = parseInt(level);

		if (Number.isNaN(parsedLevel))
			throw new HttpException("Invalid level query value!", HttpStatus.BAD_REQUEST);
		const parsedExperience = parseInt(experience);

		if (Number.isNaN(parsedExperience))
			throw new HttpException("Invalid experience query value!", HttpStatus.BAD_REQUEST);

		return this.levelService.calculateRequiredExperience(parsedExperience, parsedLevel);
	}
}
