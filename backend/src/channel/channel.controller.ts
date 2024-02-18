import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Channel } from "./entities/channel.entity";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";

@ApiTags("Channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Get("/all")
	@ApiOperation({ summary: "Fetch all Channels", description: "Used to fetch all Channels" })
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<Channel> })
	async findAll() {
		return await this.channelService.findAll();
	}

	@Get("/of/:target")
	@ApiOperation({ summary: "Fetch all Channels", description: "Used to fetch all Channels" })
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<Channel> })
	async findOf(@Param("target") target: string) {
		return await this.channelService.findUserChannels(target);
	}

	@Get("/joinable/:target")
	@ApiOperation({
		summary: "Fetch all joinable Channels",
		description: "Used to fetch all joinable Channels",
	})
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<Channel> })
	async findJoinable(@Param("target") target: string) {
		return await this.channelService.findJoinableChannels(target);
	}

	@Get("/invited/:target")
	@ApiOperation({
		summary: "Fetch all joinable Channels",
		description: "Used to fetch all joinable Channels",
	})
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<Channel> })
	async findInvited(@Param("target") target: string) {
		return await this.channelService.findInvited(target);
	}

	@ApiOperation({
		summary: "Fetch a Channel by channelname",
		description: "Used to fetch a Channel by channelname",
	})
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Channel })
	@ApiResponse({ status: 400, description: "Channel doesn't exist" })
	@Get(":id")
	async findOne(@Param("id") id: string) {
		const result = await this.channelService.findOne(id);
		return result;
	}
}
