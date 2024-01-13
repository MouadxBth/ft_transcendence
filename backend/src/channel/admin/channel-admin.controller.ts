import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { ChannelAdminService } from "./channel-admin.service";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelAdminController {
	constructor(private readonly channelAdminService: ChannelAdminService) {}

	@Post("kick")
	@ApiOperation({ summary: "Kick a member from the channel" })
	@ApiResponse({ status: 200, description: "Successfully kicked the member" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async kick(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.kick(authenticatedUser.user, dto);
	}

	@Post("mute")
	@ApiOperation({ summary: "Mute a member in the channel" })
	@ApiResponse({ status: 200, description: "Successfully muted the member" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async mute(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.mute(authenticatedUser.user, dto);
	}

	@Post("unmute")
	@ApiOperation({ summary: "Unmute a member in the channel" })
	@ApiResponse({ status: 200, description: "Successfully unmuted the member" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async unmute(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.unmute(authenticatedUser.user, dto);
	}

	@Post("ban")
	@ApiOperation({ summary: "Ban a member from the channel" })
	@ApiResponse({ status: 200, description: "Successfully banned the member" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async ban(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.ban(authenticatedUser.user, dto);
	}

	@Post("unban")
	@ApiOperation({ summary: "Unban a member in the channel" })
	@ApiResponse({ status: 200, description: "Successfully unbanned the member" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or member not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async unban(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.unban(authenticatedUser.user, dto);
	}

	@Post("invite")
	@ApiOperation({ summary: "Invite a user to the channel" })
	@ApiResponse({ status: 200, description: "Successfully invited the user to the channel" })
	@ApiResponse({
		status: 400,
		description: "Bad Request - Operation not permitted or user not found",
	})
	@ApiBody({ type: AdminOperationsDto })
	async invite(@Req() request: Request, @Body() dto: AdminOperationsDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelAdminService.invite(authenticatedUser.user, dto);
	}
}

// kick
// mute
// ban?
// invite?
// make / remove admin
