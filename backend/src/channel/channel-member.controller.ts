import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ChannelMemberService } from './channel-member.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { JoinChannelDto } from './dto/join-channel.dto';
import type { Request } from 'express';
import { User } from '@prisma/client';

@Controller('channel')
@UseGuards(AuthenticatedGuard)
export class ChannelMemberController {
    constructor(private readonly channelMemberService: ChannelMemberService){}

    @Get("channelmember/:target")
    async findOne(@Param("target", ParseIntPipe) target: number)
    {
      return await this.channelMemberService.findOne(target);
    }

    @Post("join")
    async join(@Req() request: Request, @Body() dto: JoinChannelDto)
    {
       return await this.channelMemberService.join(request.user! as User, dto);
    }

    @Delete("leave/:channel")
    async leave(@Req() request: Request, @Param("channel") channel: string)
    {
       return await this.channelMemberService.leave(request.user! as User, channel);
    }

}
