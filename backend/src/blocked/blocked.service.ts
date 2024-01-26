import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Blocked } from "./types/blocked.type";
import { BlockedCache } from "./blocked.cache";
import { UserService } from "src/user/user.service";
import { BlockStatus } from "./types/block-status.type";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class BlockedService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly blockedCache: BlockedCache,
		private readonly userService: UserService
	) {}

	async getBlockedAndBlockedBy(username: string) {
		let result = await this.blockedCache.getAndUpdate(username);

		if (!result) {
			const user = await this.prismaService.user.findUnique({
				where: { username },
				select: {
					username: true,
					nickname: true,
					blocked: { select: { username: true } },
					blockedBy: { select: { username: true } },
				},
			});

			if (!user) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

			result = {
				username: user.username,
				nickname: user.nickname!,
				blocked: user.blocked.map((victim) => victim.username),
				blockedBy: user.blockedBy.map((aggressor) => aggressor.username),
			};

			await this.blockedCache.set(username, result);
		}
		return result;
	}

	private async getBlocked(username: string) {
		const result = await this.getBlockedAndBlockedBy(username);
		return result.blocked;
	}

	private async getBlockedBy(username: string) {
		const result = await this.getBlockedAndBlockedBy(username);
		return result.blockedBy;
	}

	async isBlocking(username: string, target: string) {
		const result = await this.getBlocked(username);
		return result.find((value) => value === target);
	}

	async isBlockedBy(username: string, target: string) {
		const result = await this.getBlockedBy(username);
		return result.find((value) => value === target);
	}

	async blockStatus(user: User, target: string) {
		const result = await this.getBlockedAndBlockedBy(target);

		return {
			senderId: user.username,
			senderNickname: user.nickname,
			targetId: target,
			targetNickname: result.nickname,
			blocking: result.blockedBy.find((value) => value === user.username) !== undefined,
			blockedBy: result.blocked.find((value) => value === user.username) !== undefined,
		} as BlockStatus;
	}

	async block(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot block yourself!", HttpStatus.BAD_REQUEST);
		const targetUser = await this.userService.findOne(target);

		const blockedCheck = await this.isBlocking(username, target);

		if (blockedCheck) throw new HttpException("User is already blocked!", HttpStatus.BAD_REQUEST);

		return this.prismaService.$transaction(async (client) => {
			const updateResult = await client.user.update({
				where: { username },
				data: {
					blocked: { connect: { username: target } },
				},
				select: {
					username: true,
					nickname: true,
					blocked: { select: { username: true } },
					blockedBy: { select: { username: true } },
				},
			});

			if (!updateResult)
				throw new HttpException("Unable to block a new user!", HttpStatus.INTERNAL_SERVER_ERROR);

			const targetResult = await this.getBlockedAndBlockedBy(target);

			targetResult.blockedBy.push(username);

			const userResult = {
				username: updateResult.username,
				nickname: updateResult.nickname,
				blocked: updateResult.blocked.map((victim) => victim.username),
				blockedBy: updateResult.blockedBy.map((aggressor) => aggressor.username),
			} as Blocked;

			await Promise.all([
				this.blockedCache.set(username, userResult),
				this.blockedCache.set(target, targetResult),
			]);

			return {
				senderId: username,
				senderNickname: updateResult.nickname,
				targetId: target,
				targetNickname: targetUser.nickname,
				blocking: userResult.blocked.find((value) => value === target) !== undefined,
				blockedBy: userResult.blockedBy.find((value) => value === username) !== undefined,
			} as BlockStatus;
		});
	}

	async unblock(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot unblock yourself!", HttpStatus.BAD_REQUEST);

		const targetUser = await this.userService.findOne(target);

		const blockedCheck = await this.isBlocking(username, target);

		if (!blockedCheck) throw new HttpException("User is not blocked!", HttpStatus.BAD_REQUEST);

		return this.prismaService.$transaction(async (client) => {
			const updateResult = await client.user.update({
				where: { username },
				data: {
					blocked: { disconnect: { username: target } },
				},
				select: {
					username: true,
					nickname: true,
					blocked: { select: { username: true } },
					blockedBy: { select: { username: true } },
				},
			});

			if (!updateResult)
				throw new HttpException("Unable to unblock user!", HttpStatus.INTERNAL_SERVER_ERROR);

			const targetResult = await this.getBlockedAndBlockedBy(target);

			targetResult.blockedBy.splice(targetResult.blockedBy.indexOf(username), 1);

			const userResult = {
				username: updateResult.username,
				nickname: updateResult.nickname,
				blocked: updateResult.blocked.map((victim) => victim.username),
				blockedBy: updateResult.blockedBy.map((aggressor) => aggressor.username),
			} as Blocked;

			await Promise.all([
				this.blockedCache.set(username, userResult),
				this.blockedCache.set(target, targetResult),
			]);

			return {
				senderId: username,
				senderNickname: updateResult.nickname,
				targetId: target,
				targetNickname: targetUser.nickname,
				blocking: userResult.blocked.find((value) => value === target) !== undefined,
				blockedBy: userResult.blockedBy.find((value) => value === username) !== undefined,
			} as BlockStatus;
		});
	}
}
