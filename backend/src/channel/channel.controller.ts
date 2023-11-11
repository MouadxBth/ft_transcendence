import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Channel } from "./entities/channel.entity";

@ApiTags("channel")
@Controller("channel")
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Post()
	@ApiOperation({ summary: "Create a new Channel", description: "Used to create a new Channel" })
	@ApiBody({ type: CreateChannelDto, description: "D.T.O for a creating a new Channel" })
	@ApiResponse({ status: 201, description: "Used created successfully", type: Channel })
	@ApiResponse({ status: 400, description: "Bad request" })
	async create(@Body() createChannelDto: CreateChannelDto) {
		const { password, ...channel } = await this.channelService.create(createChannelDto);
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
	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateChannelDto: UpdateChannelDto) {
		const { password, ...channel } = await this.channelService.update(id, updateChannelDto);
		return channel;
	}

	@ApiOperation({
		summary: "Delete a Channel by channelname",
		description: "Used to delete a Channel by channelname",
	})
	@ApiResponse({ status: 200, description: "Successful deletion", type: Channel })
	@ApiResponse({ status: 400, description: "Channel doesn't exist" })
	@Delete(":id")
	async remove(@Param("id") id: string) {
		const { password, ...channel } = await this.channelService.remove(id);
		return channel;
	}
}
