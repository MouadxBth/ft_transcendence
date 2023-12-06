import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminOperationsDto } from '../dto/admin-operations.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChannelAdminService {

    constructor(private readonly prisma: PrismaService){}

    private async verifyOperation(user: User, dto: AdminOperationsDto)
    {
        const channelResult = await this.prisma.channel.findUnique({
            where: {
                name: dto.channel
            },
            select: {
                name:true,
                ownerId: true,
                members: {
                    select: {
                        id: true,
                        userId: true,
                        admin: true,
                    }
                },
                banned: {
                    select: {
                        username: true
                    }
                }
            }
        })

        if (!channelResult)
            throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

        const adminResult = channelResult.members.find((member) => member.userId == user.username);
        if ((!adminResult || !adminResult.admin) && user.username !== channelResult.ownerId)
            throw new HttpException("Permission denied, user isn't admin/owner in the channel", HttpStatus.BAD_REQUEST);

        const member = channelResult.members.find((member) => member.userId == dto.member);
        const caller = arguments.callee.caller.name;
        if (!member && caller !== "unban")
            throw new HttpException("Target user of the operation is not a member of the channel!", HttpStatus.BAD_REQUEST);

        return {channelResult, adminResult, member};
    }

    async kick(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       return await this.prisma.channelMember.delete({
        where:{
            id: result.member!.id
        }
       }) 
    }

    async mute(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       return await this.prisma.channelMember.update({
        where:{
            id: result.member!.id
        }
        ,
        data: {
            muted: true
        }
       }) 
    }

    async unmute(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       const member =  await this.prisma.channelMember.findUnique({
        where:{
            id: result.member!.id
        }
       }) 
       if (!(member!.muted))
            throw new HttpException("Target user is not muted to be unmuted!", HttpStatus.BAD_REQUEST);

       return await this.prisma.channelMember.update({
        where:{
            id: result.member!.id
        }
        ,
        data: {
            muted: false 
        }
       }) 
    }

    async ban(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       return await this.prisma.channel.update({
        where:{
            name: result.channelResult.name 
        }
        ,
        data: {
           banned:{
            connect: {
                username: result.member!.userId 
            }
           } 
        }
       }) 
    }

    async unban(user: User, dto: AdminOperationsDto)
    {
       const result = await this.verifyOperation(user, dto);

        const banned = result.channelResult.banned.find((member) => member.username == dto.member);
        if (!banned)
            throw new HttpException("Target user is not banned to be unbanned!", HttpStatus.BAD_REQUEST);
       return await this.prisma.channel.update({
        where:{
            name: result.channelResult.name 
        }
        ,
        data: {
           banned:{
            disconnect: {
                username: dto.member
            }
           } 
        }
       }) 
    }

    async invite(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       return await this.prisma.channel.update({
        where:{
            name: result.channelResult.name
        }
        ,
        data: {
           invited:{
            connect: {
                username: result.member!.userId 
            }
           } 
        }
       }) 
    }
}
