import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { UpdateChannelDto } from "./dto/update-channel.dto";

@Controller("channel")
export class ChannelController {
	constructor(private readonly channelService: ChannelService) {}

	@Post()
	async create(@Body() createChannelDto: CreateChannelDto) {
		const { password, ...channel } = await this.channelService.create(createChannelDto);
		return channel;
	}

	@Get()
	async findAll() {
		return (await this.channelService.findAll()).map(({ password, ...channel }) => channel);
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		const { password, ...channel } = await this.channelService.findOne(id);
		return channel;
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateChannelDto: UpdateChannelDto) {
		const { password, ...channel } = await this.channelService.update(id, updateChannelDto);
		return channel;
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		const { password, ...channel } = await this.channelService.remove(id);
		return channel;
	}
}
