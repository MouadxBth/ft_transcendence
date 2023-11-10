import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelService.create(createChannelDto).then(({password, ...channel}) => (channel));
  }

  @Get()
  async findAll() {
    return (await this.channelService.findAll()).map(({password, ...channel}) => (channel));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.channelService.findOne(id).then(({password, ...channel}) => (channel));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelService.update(id, updateChannelDto).then(({password, ...channel}) => (channel));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelService.remove(id).then(({password, ...channel}) => (channel));
  }
}
