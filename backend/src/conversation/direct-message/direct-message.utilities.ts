import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { BlockedService } from "src/blocked/blocked.service";
import { DirectMessage } from "./entities/direct-message.entity";
import { PrismaService } from "src/prisma/prisma.service";
import { RawDirectMessage } from "./entities/raw-direct-message.entity";
import { DirectMessageMember } from "./entities/direct-message-member.entity";

@Injectable()
export class DirectMessageUtilities {
	constructor(
		private readonly blockedService: BlockedService,
		private readonly prismaService: PrismaService
	) {}

	async checkBlockedStatus(sender: User, target: string) {
		const blockedInfo = await this.blockedService.getBlockedAndBlockedBy(sender.username);

		if (blockedInfo.blocked.find((username) => username === target)) {
			throw new HttpException(
				"You have blocked this user, unblock him to send a message!",
				HttpStatus.BAD_REQUEST
			);
		}

		if (blockedInfo.blockedBy.find((username) => username === target)) {
			throw new HttpException(
				"You are blocked by this user, you can't send a message!",
				HttpStatus.BAD_REQUEST
			);
		}
	}

	getDirectMessageSelectFields(username: string) {
		return {
			id: true,
			createdAt: true,
			content: true,
			sender: {
				select: {
					username: true,
					nickname: true,
					avatar: true,
					firstName: true,
					lastName: true,
				},
			},
			conversation: {
				select: {
					members: {
						where: {
							NOT: {
								username,
							},
						},
						select: {
							username: true,
							nickname: true,
							avatar: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			},
		};
	}

	formatRawDirectMessage(message: RawDirectMessage) {
		const dmSender = {
			username: message.sender.username,
			nickname: message.sender.nickname!,
			avatar: message.sender.avatar!,
			firstName: message.sender.firstName!,
			lastName: message.sender.lastName!,
		} satisfies DirectMessageMember;

		const dm = {
			id: message.id,
			createdAt: message.createdAt,
			content: message.content,
			sender: dmSender,
			members: message.conversation.members.map((member) => {
				return {
					username: member.username,
					nickname: member.nickname!,
					avatar: member.avatar!,
					firstName: member.firstName!,
					lastName: member.lastName!,
				} satisfies DirectMessageMember;
			}),
		} satisfies DirectMessage;

		return {
			id: dm.id,
			createdAt: dm.createdAt,
			content: dm.content,
			sender: dm.sender,
			target: dm.members[0]!,
		};
	}

	validateFindLastSentParams(quantity: number) {
		if (quantity <= 0) {
			throw new HttpException("Invalid quantity!", HttpStatus.BAD_REQUEST);
		}
	}

	validateParams(sender: string, target: string) {
		if (sender === target) {
			throw new HttpException("Cannot find a conversation with yourself!", HttpStatus.BAD_REQUEST);
		}
	}

	async findDirectMessages(
		username: string,
		conversationId: number,
		cursor: number,
		quantity: number
	) {
		return this.prismaService.directMessage.findMany({
			where: { conversationId },
			orderBy: { createdAt: "desc" },
			cursor: cursor < 0 ? undefined : { id: cursor },
			take: quantity,
			select: this.getDirectMessageSelectFields(username),
		});
	}

	async getDirectMessage(id: number) {
		const directMessage = await this.prismaService.directMessage.findUnique({
			where: { id },
		});

		if (!directMessage) {
			throw new HttpException("Direct Message does not exist!", HttpStatus.NOT_FOUND);
		}

		return directMessage;
	}
}
