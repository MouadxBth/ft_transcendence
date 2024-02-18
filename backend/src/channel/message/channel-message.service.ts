import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MessageDto } from "../dto/message.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";
import { ChannelMessageUtilities } from "./channel-message.utilities";

@Injectable()
export class ChannelMessageService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly channelMessageUtilities: ChannelMessageUtilities
	) {}

	async create(username: string, dto: MessageDto) {
		const { member } = await this.channelMessageUtilities.verifyMessage(username, dto);

		return await this.prisma.message.create({
			data: {
				content: dto.message,
				sender: {
					connect: { id: member.id },
				},
				channel: {
					connect: { name: dto.channelName },
				},
			},
			select: this.channelMessageUtilities.formatChannelMessage(),
		});
	}

	async findAll(channel: string) {
		const result = this.prisma.channel.findUnique({
			where: { name: channel },
			select: {
				messages: {
					select: this.channelMessageUtilities.formatChannelMessage(),
				},
			},
		});
		return result;
	}

	async findLastSent(channel: string, cursor: number, quantity: number) {
		if (quantity <= 0) throw new HttpException("Invalid quantity!", HttpStatus.BAD_REQUEST);

		const result = await this.prisma.channel
			.findUnique({
				where: { name: channel },
				select: {
					messages: {
						orderBy: { createdAt: "desc" },
						cursor: cursor < 0 ? undefined : { id: cursor },
						take: quantity,
						select: this.channelMessageUtilities.formatChannelMessage(),
					},
				},
			})
			.then((value) => value?.messages);

		if (result && result.length) result.reverse();
		return result;
	}

	async update(user: User, channel: string, id: number, message: string) {
		const messageResult = await this.prisma.message.findUnique({
			where: { id },
			include: {
				sender: { select: this.channelMessageUtilities.formatChannelMember() },
			},
		});

		if (!message || message.trim().length === 0) {
			throw new HttpException(
				"Message is empty or contains only whitespace!",
				HttpStatus.BAD_REQUEST
			);
		}

		if (!messageResult) {
			throw new HttpException("No such message!", HttpStatus.BAD_REQUEST);
		}

		const { sender, channelId } = messageResult;
		const { user: senderUser } = sender;

		if (senderUser.username !== user.username) {
			throw new HttpException("You're not the sender of the message", HttpStatus.BAD_REQUEST);
		}

		if (channelId !== channel) {
			throw new HttpException(
				"The message doesn't belong to the channel you're referring to",
				HttpStatus.BAD_REQUEST
			);
		}

		return this.prisma.message.update({
			where: { id },
			data: { content: message },
			select: this.channelMessageUtilities.formatChannelMessage(),
		});
	}

	async delete(user: User, channel: string, id: number) {
		const messageResult = await this.prisma.message.findUnique({
			where: {
				id: id,
			},
			include: {
				sender: { select: this.channelMessageUtilities.formatChannelMember() },
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
			select: this.channelMessageUtilities.formatChannelMessage(),
		});
	}
}
