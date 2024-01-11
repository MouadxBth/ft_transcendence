import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ChannelMemberService } from "./channel-member.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { JoinChannelDto } from "../dto/join-channel.dto";
import type { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelMemberController {
	constructor(private readonly channelMemberService: ChannelMemberService) {}

	@Get(":channel/member/:target")
	@ApiOperation({ summary: "Get information about a channel member" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiParam({ name: "target", description: "Target user ID" })
	@ApiResponse({ status: 200, description: "Successfully retrieved channel member information" })
	@ApiResponse({ status: 400, description: "Bad Request - No such channel member found!" })
	async findOne(@Param("channel") channel: string, @Param("target") target: string) {
		return await this.channelMemberService.findOne(channel, target);
	}

	@Get(":channel/member")
	@ApiOperation({ summary: "Get all members of a channel" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiResponse({ status: 200, description: "Successfully retrieved all channel members" })
	async findAll(@Param("channel") channel: string) {
		return await this.channelMemberService.findAll(channel);
	}

	@Post("join")
	@ApiOperation({ summary: "Join a channel" })
	@ApiResponse({ status: 201, description: "Successfully joined the channel" })
	@ApiResponse({ status: 400, description: "Bad Request - Invalid credentials or channel status" })
	@ApiResponse({ status: 403, description: "Forbidden - User is banned or not invited" })
	@ApiResponse({ status: 401, description: "Bad Request - User is already a member" })
	async join(@Req() request: Request, @Body() dto: JoinChannelDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelMemberService.join(authenticatedUser.user, dto);
	}

	@Delete(":channel/leave")
	@ApiOperation({ summary: "Leave a channel" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiResponse({ status: 200, description: "Successfully left the channel" })
	@ApiResponse({ status: 400, description: "Bad Request - User isn't a member!" })
	async leave(@Req() request: Request, @Param("channel") channel: string) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		return await this.channelMemberService.leave(authenticatedUser.user, channel);
	}
}
