import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ChannelMemberService } from "./channel-member.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Channel | Member")
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
}
