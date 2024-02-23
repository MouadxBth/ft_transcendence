// import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
// import { OnlineStatusService } from "src/online-status/online-status.service";
// import { Game } from "./entities/game.entity";
// import { User } from "src/user/entities/user.entity";
// import { UserService } from "src/user/user.service";
// import { GamePlayer } from "./entities/game-player.entity";

// @Injectable()
// export class GameUtilities {
// 	private readonly sentRequests = new Map<string, Game[]>();
// 	private readonly receivedRequests = new Map<string, Game[]>();
// 	private readonly ready = new Set<Game>();

// 	constructor(
// 		private readonly onlineStatusService: OnlineStatusService,
// 		private readonly userService: UserService
// 	) {}

// 	private formatGamePlayer(user: User) {
// 		return {
// 			username: user.username,
// 			nickname: user.nickname,
// 			firstName: user.firstName,
// 			lastName: user.lastName,
// 			avatar: user.avatar,
// 			level: user.level,
// 			eloRating: user.eloRating,
// 		} satisfies GamePlayer;
// 	}

// 	getSentRequests(username: string) {
// 		const result = this.sentRequests.get(username);
// 		return result ?? [];
// 	}

// 	getReceivedRequests(username: string) {
// 		const result = this.receivedRequests.get(username);
// 		return result ?? [];
// 	}

// 	addRequest(sender: string, target: string, game: Game) {
// 		const sentResult = this.sentRequests.get(sender);

// 		if (sentResult !== undefined) {
// 			sentResult.push(game);
// 		} else {
// 			this.sentRequests.set(sender, [game]);
// 		}

// 		const receiveResult = this.receivedRequests.get(target);

// 		if (receiveResult !== undefined) {
// 			receiveResult.push(game);
// 		} else {
// 			this.sentRequests.set(target, [game]);
// 		}
// 	}

// 	deleteRequest(user: string, sender: string) {
// 		const findResult = this.requests.get(user);

// 		if (!findResult) {
// 			throw new HttpException("No request to delete!", HttpStatus.BAD_REQUEST);
// 		}

// 		const deletionResult = findResult.filter(
// 			(game) =>
// 				(game.player1.username === sender && game.player2.username === user) ||
// 				(game.player1.username === user && game.player2.username === sender)
// 		);

// 		this.requests.set(user, deletionResult);
// 	}

// 	findRequest(sender: string, target: string) {
// 		const findResult = this.receivedRequests.get(target);

// 		if (!findResult) {
// 			throw new HttpException("You have no requests to accept!", HttpStatus.BAD_REQUEST);
// 		}

// 		const request = findResult.find(
// 			(game) => game.player1.username === sender && game.player2.username === target
// 		);

// 		if (!request) {
// 			throw new HttpException(
// 				"No request has been sent from user to be accepted!",
// 				HttpStatus.BAD_REQUEST
// 			);
// 		}

// 		return request;
// 	}

// 	delete(sender: string, target: string) {
// 		const sentResult = this.sentRequests.get(sender);

// 		if (sentResult) {
// 			this.sentRequests.set(
// 				sender,
// 				sentResult.filter(
// 					(game) => !(game.player1.username === sender && game.player2.username === target)
// 				)
// 			);
// 		}

// 		const receiveResult = this.receivedRequests.get(target);

// 		if (receiveResult) {
// 			this.receivedRequests.set(
// 				sender,
// 				receiveResult.filter(
// 					(game) => !(game.player1.username === sender && game.player2.username === target)
// 				)
// 			);
// 		}
// 	}
// }
