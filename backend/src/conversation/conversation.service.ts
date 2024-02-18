import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConversationCache } from "./conversation.cache";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";
import { Conversation } from "./entities/conversation.entity";
import { BlockedService } from "src/blocked/blocked.service";
import { ConversationUtilities } from "./conversation.utilities";

@Injectable()
export class ConversationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly blockedService: BlockedService,
		private readonly conversationUtilities: ConversationUtilities,
		private readonly cache: ConversationCache
	) {}

	async create(sender: User, target: string) {
		this.conversationUtilities.guardAgainstSelfConversation(sender, target);

		await this.userService.findOne(target);

		const blockStatus = await this.blockedService.blockStatus(sender, target);
		this.conversationUtilities.handleBlockStatus(blockStatus);

		const conversationExists = await this.conversationUtilities.checkConversationExists(
			sender,
			target
		);

		if (conversationExists) {
			throw new HttpException("Conversation already exists!", HttpStatus.BAD_REQUEST);
		}

		const createdConversation = await this.prismaService.conversation.create({
			data: {
				members: { connect: [{ username: sender.username }, { username: target }] },
			},
			select: this.conversationUtilities.getConversationSelectFields(sender.username),
		});

		const formattedResult = this.conversationUtilities.formatConversationResult(
			sender,
			createdConversation
		);

		return formattedResult;
	}

	async findOne(sender: User, target: string) {
		this.conversationUtilities.guardAgainstSelfConversation(sender, target);

		let result: Conversation | null | undefined = await this.cache.getAndUpdate(
			sender.username,
			target
		);

		if (!result) {
			const current = await this.conversationUtilities.findConversation(sender, target);

			if (!current) {
				throw new HttpException("Conversation does not exist!", HttpStatus.NOT_FOUND);
			}

			result = this.conversationUtilities.formatConversationResult(sender, current);

			await this.cache.set(sender.username, target, result);
		}

		return result;
	}

	async findAll(sender: User) {
		const conversations = await this.conversationUtilities.findUserConversations(sender);

		return conversations.map((conversation) =>
			this.conversationUtilities.formatConversationResult(sender, conversation)
		);
	}

	async delete(sender: User, target: string) {
		this.conversationUtilities.guardAgainstSelfConversation(sender, target);

		const conversation = await this.conversationUtilities.findAndDeleteConversation(sender, target);

		if (!conversation) {
			throw new HttpException("Conversation does not exist!", HttpStatus.BAD_REQUEST);
		}

		await this.cache.delete(sender.username, target);

		return this.conversationUtilities.formatConversationResult(sender, conversation);
	}
}
