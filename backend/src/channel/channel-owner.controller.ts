import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ChannelOwnerService } from "./channel-owner.service";
import type { Request } from "express";
import { AdminOperationsDto } from "./dto/admin-operations.dto";
import { User } from "@prisma/client";





@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelOwnerController{
   constructor(private readonly channelOwnerService: ChannelOwnerService){}

    @Post("createAdmin")
    async createAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelOwnerService.createAdmin(request.user! as User, dto);
    }

    @Post("removeAdmin")
    async removeAdmin(@Req() request: Request, @Body() dto: AdminOperationsDto)
    {
        return await this.channelOwnerService.removeAdmin(request.user! as User, dto);
    }
}
