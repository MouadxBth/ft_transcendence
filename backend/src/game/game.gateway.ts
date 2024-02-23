import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { GameService } from "./game.service";
import { MatchHistoryService } from "src/match-history/match-history.service";
import { OnlineStatusService } from "src/online-status/online-status.service";
import { EloRankingService } from "src/elo-ranking/elo-ranking.service";
import { Game } from "./entities/game.entity";
import { LevelService } from "src/level/level.service";
import { User } from "src/user/entities/user.entity";
import { GamePlayer } from "./entities/game-player.entity";
import { AchievementService } from "src/achievement/achievement.service";

@WebSocketGateway({
	namespace: "game",
})
@UsePipes(WsValidationPipe)
@UseGuards(WsAuthenticatedGuard)
@UseFilters(WsExceptionFilter)
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private readonly gameService: GameService,
		private readonly matchHistoryService: MatchHistoryService,
		private readonly onlineStatusService: OnlineStatusService,
		private readonly eloRankingService: EloRankingService,
		private readonly levelService: LevelService,
		private readonly achievementService: AchievementService
	) {}

	@WebSocketServer()
	private readonly server: Socket;

	private readonly lastScored = new Set<string>();
	private readonly superPaddles = new Set<string>();

	async handleConnection(@ConnectedSocket() client: Socket) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		console.log("GAME - JOIN: ", user.username);

		client.join(user.username);
	}

	async endGame(user: User, game: Game, left: boolean) {
		let winner: GamePlayer;
		let loser: GamePlayer;

		if (left) {
			winner = game.player1.user.username === user.username ? game.player2 : game.player1;
			loser = game.player1.user.username === user.username ? game.player1 : game.player2;

			winner.winner = true;
			loser.winner = false;
		} else if (game.player1.score > game.player2.score) {
			game.player1.winner = true;

			winner = game.player1;
			loser = game.player2;
		} else if (game.player2.score > game.player1.score) {
			game.player2.winner = true;

			winner = game.player2;
			loser = game.player1;
		} else {
			game.player1.draw = true;
			game.player2.draw = true;

			winner = game.player1;
			loser = game.player1;
		}

		await this.matchHistoryService.recordResults({
			matchId: game.id,
			player1: game.player1,
			player2: game.player2,
		});

		await this.eloRankingService.updateElo(game.id);

		const [first, second] = await Promise.all([
			this.levelService.grantExperience(winner),
			this.levelService.grantExperience(loser),
		]);

		if (first.leveledUp) {
			const achievement = await this.achievementService.create({
				name: `Level-${first.updatedLevel}`,
				brief: `Yay! Level ${first.updatedLevel}`,
				description: `You did it! you leveld up to level ${first.updatedLevel}! Keep up :)`,
			});

			const result = await this.achievementService.awardAchievement(
				achievement.name,
				winner.user.username,
				true
			);
			this.server.to(winner.user.username).emit("achievement_awarded", result);
		}

		if (second.leveledUp) {
			const achievement = await this.achievementService.create({
				name: `Level-${second.updatedLevel}`,
				brief: `Yay! Level ${second.updatedLevel}`,
				description: `You did it! you leveld up to level ${second.updatedLevel}! Keep up :)`,
			});

			const result = await this.achievementService.awardAchievement(
				achievement.name,
				loser.user.username,
				true
			);
			this.server.to(loser.user.username).emit("achievement_awarded", result);
		}

		this.gameService.removeGame(winner.user.username);

		this.server.emit(
			"status_update",
			winner.user.username,
			this.onlineStatusService.onlineStatus(winner.user.username)
		);

		this.server.emit(
			"status_update",
			loser.user.username,
			this.onlineStatusService.onlineStatus(loser.user.username)
		);

		return { winner, loser };
	}

	async handleDisconnect(@ConnectedSocket() client: Socket) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		console.log("GAME - LEAVE: ", user.username);

		const { status, game } = this.gameService.getPlayerStatus(user.username);

		this.gameService.removeFromQueue(user.username);

		const { sentResult } = this.gameService.removePlayer(user.username);

		// WARNING: Super confusing stuff ahead

		// request sent by user to another, member should have their receive list updated
		if (sentResult) {
			const receivedRequests = this.gameService.getReceivedRequests(sentResult.target.username);

			this.server
				.to(sentResult.target.username)
				.emit("challenger_disconnected", sentResult.sender, receivedRequests);
		}

		if (!(game && (status === "ready" || status === "started"))) return;

		const { winner, loser } = await this.endGame(user, game as Game, true);

		this.server.to(winner.user.username).emit("end_game", winner, loser, game);
		this.server.to(loser.user.username).emit("end_game", winner, loser, game);

		this.server.to(winner.user.username).emit("opponent_disconnected", loser, game);
	}

	@SubscribeMessage("ready_player")
	async ready(@ConnectedSocket() client: Socket) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		this.gameService.readyPlayer(user.username);

		const start = this.gameService.startGame(user.username);

		if (!start) return;

		this.server.to(start.player1.user.username).emit("start_game", start);
		this.server.to(start.player2.user.username).emit("start_game", start);
	}

	@SubscribeMessage("player_move")
	async move(
		@ConnectedSocket() _client: Socket,
		@MessageBody()
		dto: {
			player: GamePlayer;
			opponent: GamePlayer;
			velocity: number;
		}
	) {
		this.server.to(dto.opponent.user.username).emit("player_moved", dto.player, dto.velocity);
	}

	generate(right: boolean) {
		if (right) {
			// Generate a random number between 120 and 240
			return Math.floor(Math.random() * (240 - 120 + 1) + 120);
		}
		// Generate a random number between -60 and 60
		return Math.floor(Math.random() * (60 - -60 + 1) + -60);
	}

	@SubscribeMessage("player_score")
	async score(@ConnectedSocket() client: Socket, @MessageBody() dto: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const { game, status } = this.gameService.getPlayerStatus(user.username);

		if (!game || status !== "started") return;

		const match = game as Game;

		let right = false;

		console.log(match.type);

		if (match.player1.user.username === dto) {
			match.player1.score++;

			if (match.type !== "CLASSIC") {
				if (this.superPaddles.has(match.player1.user.username)) {
					this.superPaddles.delete(match.player1.user.username);
					// remove super paddle
					this.server.to(match.player1.user.username).emit("normal_paddle", true);
					this.server.to(match.player2.user.username).emit("normal_paddle", true);
				}
				if (this.lastScored.has(match.player1.user.username)) {
					this.lastScored.delete(match.player1.user.username);
					this.superPaddles.add(match.player1.user.username);
					// make paddle bigger

					this.server.to(match.player1.user.username).emit("super_paddle", true);
					this.server.to(match.player2.user.username).emit("super_paddle", true);
				} else {
					this.lastScored.add(match.player1.user.username);

					if (this.lastScored.has(match.player2.user.username)) {
						this.lastScored.delete(match.player2.user.username);
					}
				}
			}
		} else if (match.player2.user.username === dto) {
			match.player2.score++;
			right = true;

			if (match.type !== "CLASSIC") {
				if (this.superPaddles.has(match.player2.user.username)) {
					this.superPaddles.delete(match.player2.user.username);
					// remove super paddle
					this.server.to(match.player1.user.username).emit("normal_paddle", false);
					this.server.to(match.player2.user.username).emit("normal_paddle", false);
				}
				if (this.lastScored.has(match.player2.user.username)) {
					this.lastScored.delete(match.player2.user.username);
					this.superPaddles.add(match.player2.user.username);
					// make paddle bigger

					this.server.to(match.player1.user.username).emit("super_paddle", false);
					this.server.to(match.player2.user.username).emit("super_paddle", false);
				} else {
					this.lastScored.add(match.player2.user.username);

					if (this.lastScored.has(match.player1.user.username)) {
						this.lastScored.delete(match.player1.user.username);
					}
				}
			}
		}

		const angle = this.generate(right);

		console.log("RESET: ", angle);

		this.server
			.to(match.player1.user.username)
			.emit("score_change", match.player1.score, match.player2.score);
		this.server
			.to(match.player2.user.username)
			.emit("score_change", match.player1.score, match.player2.score);

		this.server.to(match.player1.user.username).emit("ball_reset", angle, 300);
		this.server.to(match.player2.user.username).emit("ball_reset", angle, 300);

		if (match.player1.score >= 7 || match.player2.score >= 7) {
			const { winner, loser } = await this.endGame(user, match, false);
			this.server.to(winner.user.username).emit("end_game", winner, loser, match);
			this.server.to(loser.user.username).emit("end_game", winner, loser, match);

			this.lastScored.delete(match.player1.user.username);
			this.lastScored.delete(match.player2.user.username);
		}
	}

	@SubscribeMessage("countdown_done")
	async countdownDone(@ConnectedSocket() client: Socket) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const { game, status } = this.gameService.getPlayerStatus(user.username);

		if (!game || status !== "started") return;

		const match = game as Game;

		const { player1, player2 } = match;

		const firstRandom = Math.random();
		let angle = 0;

		if (firstRandom <= 0.5) {
			// Generate a random number between 120 and 240
			angle = Math.floor(Math.random() * (240 - 120 + 1) + 120);
		} else {
			// Generate a random number between -60 and 60
			angle = Math.floor(Math.random() * (60 - -60 + 1) + -60);
		}

		console.log("START: ", angle);

		this.server.to(player1.user.username).emit("ball_start", angle, 300);
		this.server.to(player2.user.username).emit("ball_start", angle, 300);
	}

	@SubscribeMessage("change_ball")
	async changeBall(
		@ConnectedSocket() _client: Socket,
		@MessageBody()
		velocity: {
			game: Game;
			x: number;
			y: number;
		}
	) {
		const { x, y, game } = velocity;
		const { player1, player2 } = game;

		this.server.to(player1.user.username).emit("ball_change", x, y);
		this.server.to(player2.user.username).emit("ball_change", x, y);
	}
}
