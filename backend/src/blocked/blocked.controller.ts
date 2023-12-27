import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { BlockedService } from "./blocked.service";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import type { Request } from "express";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Blocked")
@Controller("blocked")
@UseGuards(AuthenticatedGuard)
export class BlockedController {
	constructor(private readonly blockedService: BlockedService) {}

	@Post(":target")
	@ApiBadRequestResponse({ description: "Cannot block yourself!" })
	@ApiBadRequestResponse({ description: "User is already blocked!" })
	@ApiInternalServerErrorResponse({ description: "Unable to block a new user!" })
	@ApiCreatedResponse({ description: "User has been successfully blocked." })
	async block(@Param("target") target: string, @Req() request: Request) {
		return this.blockedService.block((request.user! as AuthenticatedUser).user.username, target);
	}

	@Delete(":target")
	@ApiBadRequestResponse({ description: "Cannot unblock yourself!" })
	@ApiBadRequestResponse({ description: "User is not blocked!" })
	@ApiInternalServerErrorResponse({ description: "Unable to unblock user!" })
	@ApiOkResponse({ description: "User has been successfully unblocked." })
	async unblockUser(@Param("target") target: string, @Req() request: Request) {
		return this.blockedService.unblock((request.user! as AuthenticatedUser).user.username, target);
	}

	@Get("/")
	@ApiOkResponse({ description: "Blocked and blocked by users retrieved successfully." })
	async blockedAndBlockedBy(@Req() request: Request) {
		return this.blockedService.getBlockedAndBlockedBy(
			(request.user! as AuthenticatedUser).user.username
		);
	}
}
