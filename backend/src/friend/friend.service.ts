import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FriendService {
	constructor(private readonly prismaService: PrismaService) {}

	async friends(username: string) {
		const result = await this.prismaService.user.findUnique({
			where: { username },
			select: {
				username: true,
				friends: { select: { username: true } },
			},
		});

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return {
			username: result.username,
			friends: result.friends.map((friend) => friend.username),
		};
	}

	async sendFriendRequest(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot send a friend request to yourself!", HttpStatus.BAD_REQUEST);

		const userWithFriends = await this.friends(username);

		if (userWithFriends.friends.find((friend) => friend === target))
			throw new HttpException("Target is already a friend of you!", HttpStatus.BAD_REQUEST);

		const senderRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username },
				target: { username: target },
			},
		});

		if (senderRequest) throw new HttpException("Request already sent!", HttpStatus.BAD_REQUEST);

		const targetRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username: target },
				target: { username },
			},
		});

		if (targetRequest)
			throw new HttpException("Target already sent you a request!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.friendRequest.create({
			data: {
				sender: { connect: { username } },
				target: { connect: { username: target } },
			},
		});
	}

	async sentFriendRequests(username: string) {
		const result = await this.prismaService.user.findUnique({
			where: { username },
			select: {
				username: true,
				sentFriendRequests: { select: { id: true, targetId: true } },
			},
		});

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return {
			username: result.username,
			sentFriendRequests: result.sentFriendRequests.map((request) => request.targetId),
		};
	}

	async receivedFriendRequests(username: string) {
		const result = await this.prismaService.user.findUnique({
			where: { username },
			select: {
				username: true,
				receivedFriendRequests: { select: { id: true, senderId: true } },
			},
		});

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return {
			username: result.username,
			receivedFriendRequests: result.receivedFriendRequests.map((request) => request.senderId),
		};
	}

	async acceptFriendRequest(username: string, sender: string) {
		if (username === sender)
			throw new HttpException(
				"Cannot accept a friend request to yourself!",
				HttpStatus.BAD_REQUEST
			);

		const userWithFriends = await this.friends(username);

		if (userWithFriends.friends.find((value) => value === sender))
			throw new HttpException("Target is already a friend of you!", HttpStatus.BAD_REQUEST);

		const friendRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username: sender },
				target: { username },
			},
		});

		if (!friendRequest)
			throw new HttpException("No request from target to accept!", HttpStatus.BAD_REQUEST);

		const [_, result] = await Promise.all([
			this.prismaService.user.update({
				where: { username: sender },
				data: {
					friends: { connect: { username } },
				},
				select: {
					username: true,
					friends: { select: { username: true } },
				},
			}),
			this.prismaService.user.update({
				where: { username },
				data: {
					friends: { connect: { username: sender } },
				},
				select: {
					username: true,
					friends: { select: { username: true } },
				},
			}),
		]);

		await this.prismaService.friendRequest.delete({
			where: { id: friendRequest.id },
		});
		return {
			username: result.username,
			friends: result.friends.map((friend) => friend.username),
		};
	}

	async denyFriendRequest(username: string, sender: string) {
		if (username === sender)
			throw new HttpException("Cannot deny a friend request to yourself!", HttpStatus.BAD_REQUEST);

		const userWithFriends = await this.friends(username);

		if (userWithFriends.friends.find((value) => value === sender))
			throw new HttpException("Target is already a friend! of you", HttpStatus.BAD_REQUEST);

		const friendRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username: sender },
				target: { username },
			},
		});

		if (!friendRequest)
			throw new HttpException("No request from target to accept!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.friendRequest.delete({
			where: {
				id: friendRequest.id,
			},
		});
	}

	async unfriendUser(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot unfriend yourself!", HttpStatus.BAD_REQUEST);

		const targetUser = await this.prismaService.user.findUnique({
			where: { username: target },
		});

		if (!targetUser) throw new HttpException("Target does not exist!", HttpStatus.NOT_FOUND);

		const userWithFriends = await this.friends(username);

		if (!userWithFriends.friends.find((friend) => friend === target))
			throw new HttpException("Target is not your friend!", HttpStatus.BAD_REQUEST);

		const [_, result] = await Promise.all([
			this.prismaService.user.update({
				where: { username: target },
				data: {
					friends: { disconnect: { username } },
				},
				select: {
					username: true,
					friends: { select: { username: true } },
				},
			}),
			this.prismaService.user.update({
				where: { username },
				data: {
					friends: { disconnect: { username: target } },
				},
				select: {
					username: true,
					friends: { select: { username: true } },
				},
			}),
		]);

		return {
			username: result.username,
			friends: result.friends.map((friend) => friend.username),
		};
	}
}
