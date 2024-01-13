import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ChannelOwnerService } from "./channel-owner.service";
import type { Request } from "express";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelOwnerController {
	constructor(private readonly channelOwnerService: ChannelOwnerService) {}

	@Post("admin/add")
	@ApiOperation({ summary: "Add admin to the channel" })
	@ApiBody({ type: AdminOperationsDto })
	@ApiResponse({ status: 200, description: "Successfully added admin to the channel" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	async createAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user as AuthenticatedUser;
		return await this.channelOwnerService.createAdmin(authenticatedUser.user, dto);
	}

	@Delete("admin/delete")
	@ApiOperation({ summary: "Remove admin from the channel" })
	@ApiBody({ type: AdminOperationsDto })
	@ApiResponse({ status: 200, description: "Successfully removed admin from the channel" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	async removeAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user as AuthenticatedUser;
		return await this.channelOwnerService.removeAdmin(authenticatedUser.user, dto);
	}
}
