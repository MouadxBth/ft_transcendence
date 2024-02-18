import { Injectable } from "@nestjs/common";
import { MessageDto } from "../dto/message.dto";
import { WsException } from "@nestjs/websockets";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChannelMessageUtilities {
	constructor(private readonly prisma: PrismaService) {}

	formatChannelMessage() {
		return {
			id: true,
			content: true,
			createdAt: true,
			updatedAt: true,
			sender: {
				select: {
					id: true,
					admin: true,
					muted: true,
					user: {
						select: {
							username: true,
							nickname: true,
							avatar: true,
						},
					},
				},
			},
		};
	}

	formatChannelMember() {
		return {
			id: true,
			admin: true,
			muted: true,
			user: {
				select: {
					username: true,
					nickname: true,
					avatar: true,
				},
			},
		};
	}

	async verifyMessage(username: string, messageBody: MessageDto) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: messageBody.channelName },
			select: {
				members: { select: this.formatChannelMember() },
				banned: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});

		if (!channelResult) throw new WsException("Channel doesn't exist!");
		const member = channelResult.members.find((value) => value.user.username === username);
		const banned = channelResult.banned.find((banned) => banned.username === username);

		if (!member) throw new WsException("User is not a member!");
		if (banned) throw new WsException("User is banned!");
		if (member.muted) throw new WsException("User is muted!");

		return { channelResult, member, banned };
	}
}
