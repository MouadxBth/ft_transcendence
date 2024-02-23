import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OnlineStatusService } from "src/online-status/online-status.service";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import { BlockedService } from "src/blocked/blocked.service";
import { MatchHistoryService } from "src/match-history/match-history.service";
import { MatchHistoryDto } from "src/match-history/dto/match-history.dto";
import { Game } from "./entities/game.entity";
import { GameRequest } from "./entities/game-request.entity";
import { GameRequestPlayer } from "./entities/game-request-player.entity";
import { GamePlayer } from "./entities/game-player.entity";

@Injectable()
export class GameService {
	private readonly sentRequests = new Map<string, GameRequest>();
	private readonly receivedRequests = new Map<string, GameRequest[]>();

	private classicQueue: GamePlayer[] = [];
	private superQueue: GamePlayer[] = [];

	private readyPlayers = new Set<string>();

	private ready: Game[] = [];
	private started: Game[] = [];

	constructor(
		private readonly onlineStatusService: OnlineStatusService,
		private readonly userService: UserService,
		private readonly blockedService: BlockedService,
		private readonly matchHistoryService: MatchHistoryService
	) {}

	async joinClassicQueue(user: User) {
		const classic = this.classicQueue.find((player) => player.user.username === user.username);

		if (classic) {
			throw new HttpException("You are already in the classic game queue!", HttpStatus.BAD_REQUEST);
		}

		const gamePlayer = this.formatGamePlayer(user);

		this.classicQueue.push(gamePlayer);

		if (this.classicQueue.length >= 2) {
			const player1 = this.classicQueue.shift();
			const player2 = this.classicQueue.shift();

			if (!player1 || !player2) return;

			const result = await this.matchHistoryService.create({
				super: false,
			} satisfies MatchHistoryDto);

			const game = {
				id: result.id,
				type: result.type,
				createdAt: result.createdAt,
				player1,
				player2,
			} satisfies Game;

			this.ready.push(game);

			this.onlineStatusService.updateOnlineStatus(player1.user.username, "In-game");
			this.onlineStatusService.updateOnlineStatus(player2.user.username, "In-game");
			return game;
		}

		return true;
	}

	async joinSuperQueue(user: User) {
		const superPlayer = this.superQueue.find((player) => player.user.username === user.username);

		if (superPlayer) {
			throw new HttpException("You are already in the super game queue!", HttpStatus.BAD_REQUEST);
		}

		const gamePlayer = this.formatGamePlayer(user);

		this.superQueue.push(gamePlayer);

		if (this.superQueue.length >= 2) {
			const player1 = this.superQueue.shift();
			const player2 = this.superQueue.shift();

			if (!player1 || !player2) return;

			const result = await this.matchHistoryService.create({
				super: true,
			} satisfies MatchHistoryDto);

			const game = {
				id: result.id,
				type: result.type,
				createdAt: result.createdAt,
				player1,
				player2,
			} satisfies Game;

			this.ready.push(game);

			this.onlineStatusService.updateOnlineStatus(player1.user.username, "In-game");
			this.onlineStatusService.updateOnlineStatus(player2.user.username, "In-game");
			return game;
		}

		return true;
	}

	readyPlayer(username: string) {
		this.readyPlayers.add(username);
	}

	startGame(username: string) {
		const game = this.ready.find(
			({ player1, player2 }) =>
				player1.user.username === username || player2.user.username === username
		);

		if (!game) return null;

		if (!this.areGamePlayersReady(game)) return null;

		this.readyPlayers.delete(game.player1.user.username);
		this.readyPlayers.delete(game.player2.user.username);

		this.ready = this.ready.filter(
			({ player1, player2 }) =>
				!(player1.user.username === username || player2.user.username === username)
		);

		this.started.push(game);
		return game;
	}

	getPlayerStatus(username: string) {
		const sent = this.sentRequests.get(username);

		if (sent) {
			return {
				status: "waiting",
				game: sent,
			};
		}

		const ready = this.ready.find(
			({ player1, player2 }) =>
				player1.user.username === username || player2.user.username === username
		);

		if (ready) {
			return {
				status: "ready",
				game: ready,
			};
		}

		const started = this.started.find(
			({ player1, player2 }) =>
				player1.user.username === username || player2.user.username === username
		);

		if (started) {
			return {
				status: "started",
				game: started,
			};
		}

		return {
			status: "lobby",
			game: undefined,
		};
	}

	async sendRequest(senderUser: User, target: string, superMatch: boolean) {
		const sender = await this.userService.findOne(senderUser.username);

		const { password, twoFactorAuthenticationSecret, ...targetUser } =
			await this.userService.findOne(target);

		await this.verifyBlockStatus(sender, target);

		const request = this.sentRequests.get(sender.username);

		if (request) {
			if (request.sender.username === sender.username && request.target.username === target) {
				throw new HttpException("Request already sent", HttpStatus.BAD_REQUEST);
			}
			throw new HttpException(
				"You have already sent a request to another user!",
				HttpStatus.BAD_REQUEST
			);
		}

		const status = this.onlineStatusService.onlineStatus(target);

		if (status !== "Online") {
			throw new HttpException("User is not available right now!", HttpStatus.BAD_REQUEST);
		}

		const targetRequest = this.sentRequests.get(target);

		if (
			targetRequest &&
			targetRequest.sender.username === target &&
			targetRequest.target.username === sender.username
		) {
			throw new HttpException("Target has already sent you a request", HttpStatus.BAD_REQUEST);
		}

		const game = {
			sender: this.formatRequestPlayer(sender),
			target: this.formatRequestPlayer(targetUser),
			superMatch,
		} satisfies GameRequest;

		this.addRequest(sender.username, target, game);

		return game;
	}

	async acceptRequest(sender: string, target: User) {
		const request = this.findRequest(sender, target.username);

		await this.verifyBlockStatus(target, sender);

		const status = this.onlineStatusService.onlineStatus(sender);

		this.removeRequest(sender, target.username);

		if (status !== "Online") {
			throw new HttpException("User is no longer available!", HttpStatus.BAD_REQUEST);
		}

		const result = await this.matchHistoryService.create({
			super: request.superMatch,
		} satisfies MatchHistoryDto);

		const game = {
			id: result.id,
			type: result.type,
			createdAt: result.createdAt,
			player1: this.formatGamePlayer(request.sender),
			player2: this.formatGamePlayer(request.target),
		} satisfies Game;

		this.ready.push(game);

		this.onlineStatusService.updateOnlineStatus(sender, "In-game");
		this.onlineStatusService.updateOnlineStatus(target.username, "In-game");

		return game as Game;
	}

	declineRequest(sender: string, target: string) {
		const request = this.findRequest(sender, target);

		this.removeRequest(sender, target);

		return request;
	}

	getSentRequest(username: string) {
		const result = this.sentRequests.get(username);
		return result ? [result] : [];
	}

	getReceivedRequests(username: string) {
		const result = this.receivedRequests.get(username);
		return result ?? [];
	}

	private findRequest(senderUsername: string, targetUsername: string) {
		const findResult = this.receivedRequests.get(targetUsername);

		if (!findResult) {
			throw new HttpException("You have no requests to accept!", HttpStatus.BAD_REQUEST);
		}

		const request = findResult.find(
			({ sender, target }) =>
				sender.username === senderUsername && target.username === targetUsername
		);

		if (!request) {
			throw new HttpException(
				"No request has been sent from user to be accepted!",
				HttpStatus.BAD_REQUEST
			);
		}

		return request;
	}

	private addRequest(sender: string, target: string, request: GameRequest) {
		this.sentRequests.set(sender, request);

		const receiveResult = this.receivedRequests.get(target);

		if (receiveResult !== undefined) {
			receiveResult.push(request);
		} else {
			this.receivedRequests.set(target, [request]);
		}
	}

	private removeRequest(senderUsername: string, targetUsername: string) {
		this.sentRequests.delete(senderUsername);

		const receiveResult = this.receivedRequests.get(targetUsername);

		if (receiveResult) {
			this.receivedRequests.set(
				targetUsername,
				receiveResult.filter(
					({ sender, target }) =>
						!(sender.username === senderUsername && target.username === targetUsername)
				)
			);
		}
	}

	removeGame(username: string) {
		this.ready = this.ready.filter(({ player1, player2 }) => {
			if (player1.user.username === username || player2.user.username === username) {
				this.onlineStatusService.updateOnlineStatus(player1.user.username, "Online");
				this.onlineStatusService.updateOnlineStatus(player2.user.username, "Online");
				return false;
			}
			return true;
		});

		this.started = this.started.filter(({ player1, player2 }) => {
			if (player1.user.username === username || player2.user.username === username) {
				this.onlineStatusService.updateOnlineStatus(player1.user.username, "Online");
				this.onlineStatusService.updateOnlineStatus(player2.user.username, "Online");
				return false;
			}
			return true;
		});
	}

	removePlayer(username: string) {
		// Warning: Super confusing stuff ahead

		// request sent by username to another, each member should have their receive list updated
		// because the sent requests are deleted after player is removed
		const sentResult = this.sentRequests.get(username);

		// requests sent by another to username, each member should have their sent list updated
		// because the received requests are deleted after player is removed
		const receiveResult: GameRequest[] = [];

		// requests sent by another and received by username should be deleted
		// find a member who sent a request to username
		this.sentRequests.forEach((request, senderUsername) => {
			if (request.sender.username === senderUsername && request.target.username === username) {
				receiveResult.push(request);
			}
		});

		receiveResult.forEach(({ sender }) => {
			this.sentRequests.delete(sender.username);
		});

		const map = new Map<string, GameRequest[]>();

		// requests sent by username and received by another should be deleted
		this.receivedRequests.forEach((requests, targetUsername) => {
			map.set(
				targetUsername,
				requests.filter(
					({ sender, target }) =>
						!(sender.username === username && target.username === targetUsername)
				)
			);
		});

		map.forEach((requests, target) => {
			this.receivedRequests.set(target, requests);
		});

		this.sentRequests.delete(username);
		this.receivedRequests.delete(username);

		this.removeFromQueue(username);

		return { sentResult, receiveResult };
	}

	removeFromQueue(username: string) {
		this.classicQueue = this.classicQueue.filter((player) => player.user.username !== username);
		this.superQueue = this.superQueue.filter((player) => player.user.username !== username);
	}

	private formatGamePlayer(player: GameRequestPlayer | User) {
		let target: GameRequestPlayer = player;

		if (target instanceof User) {
			target = this.formatRequestPlayer(target);
		}

		return {
			user: {
				...target,
			},
			winner: false,
			draw: false,
			score: 0,
		} satisfies GamePlayer;
	}

	private formatRequestPlayer(user: User) {
		return {
			username: user.username,
			nickname: user.nickname,
			firstName: user.firstName,
			lastName: user.lastName,
			avatar: user.avatar,
			level: user.level,
			experience: user.experience,
			eloRating: user.eloRating,
		} satisfies GameRequestPlayer;
	}

	private areGamePlayersReady(game: Game) {
		return (
			this.readyPlayers.has(game.player1.user.username) &&
			this.readyPlayers.has(game.player2.user.username)
		);
	}

	private async verifyBlockStatus(user: User, target: string) {
		const blockStatus = await this.blockedService.blockStatus(user, target);

		if (blockStatus.blocking) {
			throw new HttpException("You are currently blocking this user", HttpStatus.BAD_REQUEST);
		}

		if (blockStatus.blockedBy) {
			throw new HttpException("You are currently blocked by this user", HttpStatus.BAD_REQUEST);
		}
	}
}
