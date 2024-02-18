import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DirectMessageDto } from "../dto/direct-message.dto";
import { UpdateDirectMessageDto } from "../dto/update-direct-message.dto";
import { ConversationService } from "../conversation.service";
import { User } from "src/user/entities/user.entity";
import { DirectMessageUtilities } from "./direct-message.utilities";

@Injectable()
export class DirectMessageService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly directMessageUtilities: DirectMessageUtilities,
		private readonly conversationService: ConversationService
	) {}

	async create(sender: User, message: DirectMessageDto) {
		await this.directMessageUtilities.checkBlockedStatus(sender, message.target);

		const conversation = await this.conversationService.findOne(sender, message.target);

		const createdMessage = await this.prismaService.directMessage.create({
			data: {
				senderId: sender.username,
				content: message.content,
				conversationId: conversation.id,
			},
			select: this.directMessageUtilities.getDirectMessageSelectFields(sender.username),
		});

		return this.directMessageUtilities.formatRawDirectMessage(createdMessage);
	}

	async findLastSent(sender: User, target: string, cursor: number, quantity: number) {
		this.directMessageUtilities.validateFindLastSentParams(quantity);

		const conversation = await this.conversationService.findOne(sender, target);

		const directMessages = await this.directMessageUtilities.findDirectMessages(
			sender.username,
			conversation.id,
			cursor,
			quantity
		);

		const formattedMessages = directMessages.map((message) =>
			this.directMessageUtilities.formatRawDirectMessage(message)
		);

		return formattedMessages.reverse();
	}

	async findAll(sender: User, target: string) {
		const conversation = await this.conversationService.findOne(sender, target);

		const directMessages = await this.prismaService.directMessage.findMany({
			where: { conversationId: conversation.id },
			select: this.directMessageUtilities.getDirectMessageSelectFields(sender.username),
		});

		return directMessages.map((message) =>
			this.directMessageUtilities.formatRawDirectMessage(message)
		);
	}

	async update(sender: string, target: string, updateDto: UpdateDirectMessageDto) {
		this.directMessageUtilities.validateParams(sender, target);

		await this.directMessageUtilities.getDirectMessage(updateDto.id);

		const updateResult = await this.prismaService.directMessage.update({
			where: { id: updateDto.id },
			data: {
				content: updateDto.content,
				read: updateDto.read,
			},
			select: this.directMessageUtilities.getDirectMessageSelectFields(sender),
		});

		return this.directMessageUtilities.formatRawDirectMessage(updateResult);
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
		this.directMessageUtilities.validateParams(sender, target);

		await this.directMessageUtilities.getDirectMessage(id);

		const deleteResult = await this.prismaService.directMessage.delete({
			where: { id },
			select: this.directMessageUtilities.getDirectMessageSelectFields(sender),
		});

		return this.directMessageUtilities.formatRawDirectMessage(deleteResult);
	}
}
