import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ConversationCache } from "./conversation.cache";
import { UserService } from "src/user/user.service";
import { Conversation } from "@prisma/client";

@Injectable()
export class ConversationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly cache: ConversationCache
	) {}

	async create(first: string, second: string) {
		if (first === second)
			throw new HttpException(
				"Cannot create a conversation with yourself!",
				HttpStatus.BAD_REQUEST
			);

		await this.userService.findOne(second);

		const conversationCheck = await this.prismaService.conversation.findFirst({
			where: {
				AND: [
					{ members: { some: { username: first } } },
					{ members: { some: { username: second } } },
				],
			},
		});

		if (conversationCheck)
			throw new HttpException("Conversation already exists!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.conversation.create({
			data: {
				members: { connect: [{ username: first }, { username: second }] },
			},
		});
	}

	async findOne(first: string, second: string) {
		if (first === second)
			throw new HttpException("Cannot find a conversation with yourself!", HttpStatus.BAD_REQUEST);

		let result: Conversation | null | undefined = await this.cache.getAndUpdate(first, second);

		if (!result) {
			result = await this.prismaService.conversation.findFirst({
				where: {
					AND: [
						{ members: { some: { username: first } } },
						{ members: { some: { username: second } } },
					],
				},
			});

			if (!result) throw new HttpException("Conversation does not exist!", HttpStatus.NOT_FOUND);

			await this.cache.set(first, second, result);
		}

		return result;
	}

	async findAll(username: string) {
		return await this.prismaService.conversation.findMany({
			where: {
				members: { some: { username } },
			},
			include: {
				members: {
					select: {
						nickname: true,
					},
					where: {
						username: {
							not: username,
						},
					},
				},
			},
		});
	}

	async delete(first: string, second: string) {
		if (first === second)
			throw new HttpException(
				"Cannot delete a conversation with yourself!",
				HttpStatus.BAD_REQUEST
			);

		const conversationCheck = await this.prismaService.conversation.findFirst({
			where: {
				AND: [
					{ members: { some: { username: first } } },
					{ members: { some: { username: second } } },
				],
			},
		});

		if (!conversationCheck)
			throw new HttpException("Conversation does not exist!", HttpStatus.BAD_REQUEST);

		return this.prismaService.$transaction(async (client) => {
			const result = await client.conversation.delete({
				where: { id: conversationCheck.id },
			});

			if (!result)
				throw new HttpException("Unable to delete conversation!", HttpStatus.INTERNAL_SERVER_ERROR);

			await this.cache.delete(first, second);
			return result;
		});
	}
}
