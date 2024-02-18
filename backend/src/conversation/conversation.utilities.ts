import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/entities/user.entity";
import { ConversationMember } from "./entities/conversation-member.entity";

@Injectable()
export class ConversationUtilities {
	constructor(private readonly prismaService: PrismaService) {}

	guardAgainstSelfConversation(first: User, second: string) {
		if (first.username === second) {
			throw new HttpException(
				"Cannot create a conversation with yourself!",
				HttpStatus.BAD_REQUEST
			);
		}
	}

	async checkConversationExists(first: User, second: string) {
		const conversationCheck = await this.prismaService.conversation.findFirst({
			where: {
				AND: [
					{ members: { some: { username: first.username } } },
					{ members: { some: { username: second } } },
				],
			},
		});

		return !!conversationCheck;
	}

	handleBlockStatus(blockStatus: any) {
		if (blockStatus.blocking) {
			throw new HttpException(
				`Not allowed! You are blocking ${blockStatus.targetNickname}`,
				HttpStatus.BAD_REQUEST
			);
		} else if (blockStatus.blockedBy) {
			throw new HttpException(
				`Not allowed! You are blocked by ${blockStatus.senderNickname}`,
				HttpStatus.BAD_REQUEST
			);
		}
	}

	getConversationSelectFields(username: string) {
		return {
			id: true,
			createdAt: true,
			members: {
				where: {
					NOT: {
						username,
					},
				},
				select: {
					nickname: true,
					username: true,
					firstName: true,
					lastName: true,
					avatar: true,
				},
			},
		};
	}

	formatConversationResult(first: User, createdConversation: any) {
		return {
			id: createdConversation.id,
			createdAt: createdConversation.createdAt,
			sender: this.formatConversationMember(first),
			target: { ...createdConversation.members[0] },
		};
	}

	formatConversationMember(user: User): ConversationMember {
		return {
			username: user.username,
			nickname: user.nickname,
			firstName: user.firstName,
			lastName: user.lastName,
			avatar: user.avatar,
		};
	}

	async findConversation(sender: User, target: string) {
		return this.prismaService.conversation.findFirst({
			where: {
				AND: [
					{ members: { some: { username: sender.username } } },
					{ members: { some: { username: target } } },
				],
			},
			select: this.getConversationSelectFields(sender.username),
		});
	}

	async findUserConversations(sender: User) {
		return this.prismaService.conversation.findMany({
			where: {
				members: { some: { username: sender.username } },
			},
			select: this.getConversationSelectFields(sender.username),
		});
	}

	async findAndDeleteConversation(sender: User, target: string) {
		return this.prismaService.$transaction(async (client) => {
			const conversationCheck = await client.conversation.findFirst({
				where: {
					AND: [
						{ members: { some: { username: sender.username } } },
						{ members: { some: { username: target } } },
					],
				},
			});

			if (!conversationCheck)
				throw new HttpException("Conversation does not exist!", HttpStatus.BAD_REQUEST);

			const conversation = await client.conversation.delete({
				where: { id: conversationCheck.id },
				select: this.getConversationSelectFields(sender.username),
			});

			if (!conversation) {
				throw new HttpException("Unable to delete conversation!", HttpStatus.INTERNAL_SERVER_ERROR);
			}

			return conversation;
		});
	}
}
