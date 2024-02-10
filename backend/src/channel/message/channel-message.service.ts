import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MessageDto } from "../dto/message.dto";
import { WsException } from "@nestjs/websockets";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class ChannelMessageService {
	constructor(private readonly prisma: PrismaService) {}

	async findLastSent(channel: string, cursor: number, quantity: number) {
		// if (cursor <= 0) throw new HttpException("Invalid Cursor!", HttpStatus.BAD_REQUEST);

		if (quantity <= 0) throw new HttpException("Invalid quantity!", HttpStatus.BAD_REQUEST);

		const result = await this.prisma.channel
			.findUnique({
				where: { name: channel },
				select: {
					messages: {
						orderBy: { createdAt: "desc" },
						cursor: cursor < 0 ? undefined : { id: cursor },
						take: quantity,
						select: {
							id: true,
							channel: false,
							channelId: false,
							sender: {
								select: {
									user: {
										select: {
											username: true,
											nickname: true,
											avatar: true,
										},
									},
									admin: true,
									muted: true,
									id: true,
								},
							},
							content: true,
							createdAt: true,
							updatedAt: true,
						},
					},
				},
			})
			.then((value) => value?.messages);

		if (result && result.length) result.reverse();
		return result;
	}

	async findAll(channel: string) {
		const result = this.prisma.channel.findUnique({
			where: { name: channel },
			select: {
				messages: {
					select: {
						id: true,
						channel: false,
						channelId: false,
						sender: false,
						senderId: true,
						content: true,
						createdAt: true,
						updatedAt: true,
					},
				},
			},
		});
		return result;
	}

	async update(user: User, channel: string, id: number, message: string) {
		const messageResult = await this.prisma.message.findUnique({
			where: {
				id: id,
			},
			include: {
				sender: {
					select: {
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
			},
		});

		if (!message || message.length === 0)
			throw new HttpException("Message is empty!", HttpStatus.BAD_REQUEST);

		if (!messageResult) throw new HttpException("No such message!", HttpStatus.BAD_REQUEST);

		if (messageResult.sender.user.username != user.username)
			throw new HttpException("You're not the sender of the message", HttpStatus.BAD_REQUEST);

		if (messageResult.channelId != channel)
			throw new HttpException(
				"The message doesn't belong to the channel you're referring to",
				HttpStatus.BAD_REQUEST
			);

		return await this.prisma.message.update({
			where: {
				id: id,
			},
			data: {
				content: message,
			},
		});
	}

	async delete(user: User, channel: string, id: number) {
		const messageResult = await this.prisma.message.findUnique({
			where: {
				id: id,
			},
			include: {
				sender: {
					select: {
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
			},
		});

		if (!messageResult) throw new HttpException("No such message!", HttpStatus.BAD_REQUEST);

		if (messageResult.sender.user.username != user.username)
			throw new HttpException("You're not the sender of the message", HttpStatus.BAD_REQUEST);

		if (messageResult.channelId != channel)
			throw new HttpException(
				"The message doesn't belong to the channel you're referring to",
				HttpStatus.BAD_REQUEST
			);

		return await this.prisma.message.delete({
			where: {
				id: id,
			},
		});
	}

	async verifyMessage(username: string, messageBody: MessageDto) {
		const channelResult = await this.prisma.channel.findUnique({
			where: { name: messageBody.channelName },
			select: {
				members: {
					where: {
						userId: username,
					},
				},
				banned: {
					where: {
						username,
					},
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});

		if (!channelResult) throw new WsException("Channel doesn't exist!");
		const member = channelResult.members.find((value) => value.userId === username);
		const banned = channelResult.banned.find((banned) => banned.username === username);

		if (!member) throw new WsException("User is not a member!");
		if (banned) throw new WsException("User is banned!");
		if (member.muted) throw new WsException("User is muted!");

		return channelResult;
	}

	async createMessage(id: number, messageBody: MessageDto) {
		return await this.prisma.message.create({
			data: {
				content: messageBody.message,
				sender: {
					connect: {
						id,
					},
				},
				channel: {
					connect: {
						name: messageBody.channelName,
					},
				},
			},
			select: {
				id: true,
				channel: false,
				channelId: false,
				sender: {
					select: {
						user: {
							select: {
								username: true,
								nickname: true,
								avatar: true,
							},
						},
						admin: true,
						muted: true,
						id: true,
					},
				},
				content: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}
}
