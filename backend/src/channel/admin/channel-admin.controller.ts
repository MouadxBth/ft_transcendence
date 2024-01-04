import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { AdminOperationsDto } from '../dto/admin-operations.dto';
import { ChannelAdminService } from './channel-admin.service';
import { AuthenticatedUser } from 'src/auth/entities/authenticated-user.entity';

@Controller('channel')
@UseGuards(AuthenticatedGuard)
export class ChannelAdminController {
    constructor(private readonly channelAdminService: ChannelAdminService){}

    @Post("kick")
    async kick(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.kick(authenticatedUser.user, dto);
    }

    @Post("mute")
    async mute(@Req() request: Request, @Body() dto: AdminOperationsDto){
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.mute(authenticatedUser.user, dto);
    }

    @Post("unmute")
    async unmute(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.unmute(authenticatedUser.user, dto);
    }

    @Post("ban")
    async ban(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.ban(authenticatedUser.user, dto);
    }

    @Post("unban")
    async unban(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.unban(authenticatedUser.user, dto);
    }

    @Post("invite")
    async invite(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        const authenticatedUser = request.user! as AuthenticatedUser;
        return await this.channelAdminService.invite(authenticatedUser.user, dto);
    }
}




// kick
// mute 
// ban?
// invite?
// make / remove admin 