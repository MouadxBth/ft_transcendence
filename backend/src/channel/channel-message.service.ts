import { Injectable } from "@nestjs/common";
import { MessageDto } from "./dto/message.dto";
import { User } from "@prisma/client";
import { WsException } from "@nestjs/websockets";
import { PrismaService } from "src/prisma/prisma.service";


@Injectable()
export class ChannelMessageService{
    constructor(private readonly prisma: PrismaService){};

    async verifyMessage(messageBody: MessageDto, user: User)
    {
		const channelResult = await this.prisma.channel.findUnique({ where: { name: messageBody.channelName }, 
            include: { members: true }});

        if (!channelResult)
            throw new WsException("Channel doesn't exist!");
        const member = channelResult.members.find((value) => value.userId === user.username);

       if (!member)
            throw new WsException("User is not a member!");
       if (member.muted) 
            throw new WsException("User is muted!");
    }

	async createMessage(messageBody: MessageDto, user: User)
	{
        return await this.prisma.message.create({
            data: {
                content: messageBody.message,
                sender: {
                    connect: {
                        username: user.username,
                    },
                },
                channel:{
                    connect:{
                        name: messageBody.channelName,
                    },
                },
            }
        })
	}
}