import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Channel } from "./entities/channel.entity";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import type { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@ApiTags("channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Post()
	@ApiOperation({ summary: "Create a new Channel", description: "Used to create a new Channel" })
	@ApiBody({ type: CreateChannelDto, description: "D.T.O for a creating a new Channel" })
	@ApiResponse({ status: 201, description: "Used created successfully", type: Channel })
	@ApiResponse({ status: 400, description: "Bad request" })
	async create(@Req() request: Request, @Body() createChannelDto: CreateChannelDto) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		const { password, ...channel } = await this.channelService.create(
			createChannelDto,
			authenticatedUser.user
		);
		return channel;
	}

	@Get()
	@ApiOperation({ summary: "Fetch all Channels", description: "Used to fetch all Channels" })
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Array<Channel> })
	async findAll() {
		return (await this.channelService.findAll()).map(({ password, ...channel }) => channel);
	}

	@ApiOperation({
		summary: "Fetch a Channel by channelname",
		description: "Used to fetch a Channel by channelname",
	})
	@ApiResponse({ status: 200, description: "Successful retrieval", type: Channel })
	@ApiResponse({ status: 400, description: "Channel doesn't exist" })
	@Get(":id")
	async findOne(@Param("id") id: string) {
		const { password, ...channel } = await this.channelService.findOne(id);
		return channel;
	}

	@ApiOperation({
		summary: "Update a Channel by channelname",
		description: "Used to update a Channel by channelname",
	})
	@ApiResponse({ status: 200, description: "Successful update", type: Channel })
	@ApiResponse({ status: 400, description: "Channel doesn't exist" })
	@ApiResponse({ status: 400, description: "Not the owner of the channel" })
	@Patch(":id")
	async update(
		@Req() request: Request,
		@Param("id") id: string,
		@Body() updateChannelDto: UpdateChannelDto
	) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		const { password, ...channel } = await this.channelService.update(
			id,
			updateChannelDto,
			authenticatedUser.user
		);
		return channel;
	}

	@ApiOperation({
		summary: "Delete a Channel by channelname",
		description: "Used to delete a Channel by channelname",
	})
	@ApiResponse({ status: 200, description: "Successful deletion", type: Channel })
	@ApiResponse({ status: 400, description: "Channel doesn't exist" })
	@ApiResponse({ status: 400, description: "Not the owner of the channel" })
	@Delete(":id")
	async remove(@Req() request: Request, @Param("id") id: string) {
		const authenticatedUser = request.user! as AuthenticatedUser;
		const { password, ...channel } = await this.channelService.remove(id, authenticatedUser.user);
		return channel;
	}
}
