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
				friends: {
					select: { username: true, nickname: true, avatar: true, firstName: true, lastName: true },
				},
			},
		});

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return result.friends;
	}

	async friendStatus(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot check friend status with yourself!", HttpStatus.BAD_REQUEST);

		return await Promise.all([
			this.friends(username).then((result) => result.some((friend) => friend.username === target)),
			this.prismaService.friendRequest.findFirst({
				where: {
					OR: [
						{
							sender: { username },
							target: { username: target },
						},
						{
							sender: { username: target },
							target: { username },
						},
					],
				},
			}),
		]).then((value) => {
			return {
				friends: value[0],
				sentRequest: value[1]?.senderId === username,
				receivedRequest: value[1]?.senderId === target,
			};
		});
	}

	async sendFriendRequest(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot send a friend request to yourself!", HttpStatus.BAD_REQUEST);

		const friends = await this.friends(username);

		if (friends.find((friend) => friend.username === target))
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
			select: {
				createdAt: true,
				sender: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
				target: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});
	}

	async sentFriendRequests(username: string) {
		const result = await this.prismaService.user.findUnique({
			where: { username },
			select: {
				username: true,
				sentFriendRequests: {
					select: {
						createdAt: true,
						target: {
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

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return result;
	}

	async receivedFriendRequests(username: string) {
		const result = await this.prismaService.user.findUnique({
			where: { username },
			select: {
				username: true,
				receivedFriendRequests: {
					select: {
						createdAt: true,
						sender: {
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

		if (!result) throw new HttpException("User does not exist!", HttpStatus.NOT_FOUND);

		return result;
	}

	async acceptFriendRequest(username: string, sender: string) {
		if (username === sender)
			throw new HttpException(
				"Cannot accept a friend request to yourself!",
				HttpStatus.BAD_REQUEST
			);

		const friends = await this.friends(username);

		if (friends.find((value) => value.username === sender))
			throw new HttpException("Target is already a friend of you!", HttpStatus.BAD_REQUEST);

		const friendRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username: sender },
				target: { username },
			},
		});

		if (!friendRequest)
			throw new HttpException("No request from target to accept!", HttpStatus.BAD_REQUEST);

		const [senderResult, targetResult] = await Promise.all([
			this.prismaService.user.update({
				where: { username: sender },
				data: {
					friends: { connect: { username } },
				},
				select: {
					username: true,
					nickname: true,
					avatar: true,
					friends: {
						select: {
							username: true,
							firstName: true,
							lastName: true,
							nickname: true,
							avatar: true,
						},
					},
				},
			}),
			this.prismaService.user.update({
				where: { username },
				data: {
					friends: { connect: { username: sender } },
				},
				select: {
					username: true,
					nickname: true,
					avatar: true,
					friends: {
						select: {
							username: true,
							firstName: true,
							lastName: true,
							nickname: true,
							avatar: true,
						},
					},
				},
			}),
		]);

		await this.prismaService.friendRequest.delete({
			where: { id: friendRequest.id },
		});
		return {
			createdAt: friendRequest.createdAt,
			sender: senderResult,
			target: targetResult,
		};
	}

	async denyFriendRequest(username: string, sender: string) {
		if (username === sender)
			throw new HttpException("Cannot deny a friend request to yourself!", HttpStatus.BAD_REQUEST);

		const friends = await this.friends(username);

		if (friends.find((value) => value.username === sender))
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
			select: {
				createdAt: true,
				sender: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
				target: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});
	}

	async cancelFriendRequest(username: string, target: string) {
		if (username === target)
			throw new HttpException(
				"Cannot cancel a friend request to yourself!",
				HttpStatus.BAD_REQUEST
			);

		const friendRequest = await this.prismaService.friendRequest.findFirst({
			where: {
				sender: { username },
				target: { username: target },
			},
		});

		if (!friendRequest)
			throw new HttpException("No request was sent from you to target!", HttpStatus.BAD_REQUEST);

		const result = await this.prismaService.friendRequest.delete({
			where: { id: friendRequest.id },
			select: {
				createdAt: true,
				sender: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
				target: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
					},
				},
			},
		});
		return result;
	}

	async unfriendUser(username: string, target: string) {
		if (username === target)
			throw new HttpException("Cannot unfriend yourself!", HttpStatus.BAD_REQUEST);

		const targetUser = await this.prismaService.user.findUnique({
			where: { username: target },
		});

		if (!targetUser) throw new HttpException("Target does not exist!", HttpStatus.NOT_FOUND);

		const friends = await this.friends(username);

		if (!friends.find((friend) => friend.username === target))
			throw new HttpException("Target is not your friend!", HttpStatus.BAD_REQUEST);

		const [senderResult, targetResult] = await Promise.all([
			this.prismaService.user.update({
				where: { username: target },
				data: {
					friends: { disconnect: { username } },
				},
				select: {
					username: true,
					nickname: true,
					avatar: true,
					friends: {
						select: {
							username: true,
							firstName: true,
							lastName: true,
							nickname: true,
							avatar: true,
						},
					},
				},
			}),
			this.prismaService.user.update({
				where: { username },
				data: {
					friends: { disconnect: { username: target } },
				},
				select: {
					username: true,
					nickname: true,
					avatar: true,
					friends: {
						select: {
							username: true,
							firstName: true,
							lastName: true,
							nickname: true,
							avatar: true,
						},
					},
				},
			}),
		]);

		return {
			sender: senderResult,
			target: targetResult,
		};
	}
}
