import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminOperationsDto } from './dto/admin-operations.dto';

@Injectable()
export class ChannelAdminService {

    constructor(private readonly prisma: PrismaService){}

    async verifyOperation(user: User, dto: AdminOperationsDto)
    {
        const channelResult = await this.prisma.channel.findUnique({
            where: {
                name: dto.channel
            },
            include: {
                members: {
                    select: {
                        id: true,
                        userId: true,
                        admin: true,
                    }
                },
                // banned: {
                //     select: {
                //         username: true
                //     }
                // }
            }
        })

        if (!channelResult)
            throw new HttpException("No such channel!", HttpStatus.BAD_REQUEST);

        const admin = channelResult.members.find((member) => member.userId == user.username);
        if ((!admin || !admin.admin) && user.username !== channelResult.ownerId)
            throw new HttpException("Permission denied, user isn't admin/owner in the channel", HttpStatus.BAD_REQUEST);

        const member = channelResult.members.find((member) => member.userId == dto.member);
        const caller = arguments.callee.caller.name;
        if (!member && caller !== "unban")
            throw new HttpException("Target user of the operation is not a member of the channel!", HttpStatus.BAD_REQUEST);

        return {channelResult, admin, member};
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
            name: dto.channel
        }
        ,
        data: {
        //    banned:{
        //     connect: {
        //         username: dto.member
        //     }
        //    } 
        }
       }) 
    }

    async unban(user: User, dto: AdminOperationsDto)
    {
       const result = await this.verifyOperation(user, dto);

        // const banned = channelResult.banned.find((member) => member.userId == dto.member);
        // if (!banned)
        //     throw new HttpException("Target user is not banned to be unbanned!", HttpStatus.BAD_REQUEST);
       return await this.prisma.channel.update({
        where:{
            name: dto.channel
        }
        ,
        data: {
        //    banned:{
        //     disconnect: {
        //         username: dto.member
        //     }
        //    } 
        }
       }) 
    }

    async invite(user: User, dto: AdminOperationsDto)
    {
        const result = await this.verifyOperation(user, dto);

       return await this.prisma.channel.update({
        where:{
            name: dto.channel
        }
        ,
        data: {
        //    invited:{
        //     connect: {
        //         username: dto.member
        //     }
        //    } 
        }
       }) 
    }
}
