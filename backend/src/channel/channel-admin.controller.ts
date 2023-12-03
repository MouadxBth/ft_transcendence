import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { AdminOperationsDto } from './dto/admin-operations.dto';
import { ChannelAdminService } from './channel-admin.service';
import { User } from '@prisma/client';

@Controller('channel')
@UseGuards(AuthenticatedGuard)
export class ChannelAdminController {
    constructor(private readonly channelAdminService: ChannelAdminService){}

    @Post("kick")
    async kick(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelAdminService.kick(request.user! as User, dto);
    }

    @Post("mute")
    async mute(@Req() request: Request, @Body() dto: AdminOperationsDto){
        
        
        return await this.channelAdminService.mute(request.user! as User, dto);
    }

    @Post("unmute")
    async unmute(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelAdminService.unmute(request.user! as User, dto);
    }

    @Post("ban")
    async ban(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelAdminService.ban(request.user! as User, dto);
    }

    @Post("unban")
    async unban(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelAdminService.unban(request.user! as User, dto);
    }

    @Post("invite")
    async invite(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelAdminService.invite(request.user! as User, dto);
    }
}




// kick
// mute 
// ban?
// invite?
// make / remove admin 