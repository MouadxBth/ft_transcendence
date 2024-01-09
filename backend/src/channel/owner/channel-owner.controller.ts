import { Body, Controller, Delete, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ChannelOwnerService } from "./channel-owner.service";
import type { Request } from "express";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelOwnerController {
	constructor(private readonly channelOwnerService: ChannelOwnerService) {}

	@Post("admin/add")
	async createAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user as AuthenticatedUser;
		return await this.channelOwnerService.createAdmin(authenticatedUser.user, dto);
	}

	@Delete("admin/delete")
	async removeAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user as AuthenticatedUser;
		return await this.channelOwnerService.removeAdmin(authenticatedUser.user, dto);
	}
}
