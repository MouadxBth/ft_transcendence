import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ChannelMemberService } from './channel-member.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { JoinChannelDto } from '../dto/join-channel.dto';
import type { Request } from 'express';
import { AuthenticatedUser } from 'src/auth/entities/authenticated-user.entity';

@Controller('channel')
@UseGuards(AuthenticatedGuard)
export class ChannelMemberController {
    constructor(private readonly channelMemberService: ChannelMemberService){}

    @Get(":channel/member/:target")
    async findOne(@Param("channel") channel: string, @Param("target") target: string)
    {
      return await this.channelMemberService.findOne(channel, target);
    }

    @Get(":channel/member")
    async findAll(@Param("channel") channel: string)
    {
         return await this.channelMemberService.findAll(channel);
    }

    @Post("join")
    async join(@Req() request: Request, @Body() dto: JoinChannelDto)
    {
       const authenticatedUser = request.user! as AuthenticatedUser;
       return await this.channelMemberService.join(authenticatedUser.user, dto);
    }

    @Delete(":channel/leave")
    async leave(@Req() request: Request, @Param("channel") channel: string)
    {
       const authenticatedUser = request.user! as AuthenticatedUser;
       return await this.channelMemberService.leave(authenticatedUser.user, channel);
    }

}
