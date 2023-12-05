import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DirectMessageDto } from "../dto/direct-message.dto";
import { UpdateDirectMessageDto } from "../dto/update-direct-message.dto";
import { ConversationService } from "../conversation.service";
import { BlockedService } from "src/blocked/blocked.service";

@Injectable()
export class DirectMessageService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly conversationService: ConversationService,
		private readonly blockedService: BlockedService
	) {}

	async create(sender: string, message: DirectMessageDto) {
		const blockedInfo = await this.blockedService.getBlockedAndBlockedBy(sender);

		if (blockedInfo.blocked.find((username) => username === message.target))
			throw new HttpException(
				"You have blocked this user, unblock him to send a message!",
				HttpStatus.BAD_REQUEST
			);

		if (blockedInfo.blockedBy.find((username) => username === message.target))
			throw new HttpException(
				"You are blocked by this user, you can't send a message!",
				HttpStatus.BAD_REQUEST
			);

		const conversation = await this.conversationService.findOne(sender, message.target);

		return await this.prismaService.directMessage.create({
			data: {
				senderId: sender,
				content: message.content,
				conversationId: conversation.id,
			},
		});
	}

	async findLastSent(first: string, second: string, cursor: number, quantity: number) {
		if (cursor <= 0) throw new HttpException("Invalid Cursor!", HttpStatus.BAD_REQUEST);

		if (quantity <= 0) throw new HttpException("Invalid quantity!", HttpStatus.BAD_REQUEST);

		const conversation = await this.conversationService.findOne(first, second);

		const result = await this.prismaService.directMessage.findMany({
			where: { conversationId: conversation.id },
			orderBy: { createdAt: "desc" },
			cursor: { id: cursor },
			take: quantity,
			select: {
				id: true,
				createdAt: true,
				updatedAt: true,
				senderId: true,
				content: true,
				read: true,
			},
		});

		if (result && result.length) result.reverse();
		return result;
	}

	async findAll(first: string, second: string) {
		const conversation = await this.conversationService.findOne(first, second);

		return await this.prismaService.directMessage.findMany({
			where: { conversationId: conversation.id },
			select: {
				id: true,
				senderId: true,
				content: true,
				read: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async update(sender: string, target: string, updateDto: UpdateDirectMessageDto) {
		if (sender === target)
			throw new HttpException("Cannot find a conversation with yourself!", HttpStatus.BAD_REQUEST);

		const directMessage = await this.prismaService.directMessage.findUnique({
			where: { id: updateDto.id },
		});

		if (!directMessage)
			throw new HttpException("Direct Message does not exist!", HttpStatus.NOT_FOUND);

		return await this.prismaService.directMessage.update({
			where: { id: updateDto.id },
			data: {
				content: updateDto.content,
				read: updateDto.read,
			},
		});
	}

	async readLastSent(first: string, second: string, cursor: number, quantity: number) {
		if (first === second)
			throw new HttpException("Cannot find a conversation with yourself!", HttpStatus.BAD_REQUEST);

		if (cursor <= 0) throw new HttpException("Invalid Cursor!", HttpStatus.BAD_REQUEST);

		if (quantity <= 0) throw new HttpException("Invalid quantity!", HttpStatus.BAD_REQUEST);

		const messageIds = await this.prismaService.directMessage
			.findMany({
				orderBy: { createdAt: "desc" },
				cursor: { id: cursor },
				take: quantity,
				where: { read: false },
				select: { id: true },
			})
			.then((messages) => messages.map((message) => message.id));

		if (!messageIds)
			throw new HttpException("Unable to fetch message ids!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.directMessage.updateMany({
			where: { id: { in: messageIds } },
			data: { read: true },
		});
	}

	async delete(sender: string, target: string, id: number) {
		if (sender === target)
			throw new HttpException("Cannot find a conversation with yourself!", HttpStatus.BAD_REQUEST);

		const directMessage = await this.prismaService.directMessage.findUnique({
			where: { id },
		});

		if (!directMessage)
			throw new HttpException("Direct Message does not exist!", HttpStatus.NOT_FOUND);

		return await this.prismaService.directMessage.delete({
			where: { id },
		});
	}
}
