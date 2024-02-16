import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsException,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { GameRoomDto, PlayerMovementDto } from "./dto/game.dto";
import { MatchHistoryService } from "src/match-history/match-history.service";
import { MatchResultDto } from "src/match-history/dto/match-result.dto";

@WebSocketGateway({
	namespace: "game",
})
@UsePipes(WsValidationPipe)
@UseGuards(WsAuthenticatedGuard)
@UseFilters(WsExceptionFilter)
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly matchHistoryService: MatchHistoryService) {}

	@WebSocketServer()
	private readonly server: Socket;
	connnectedPlayers: Set<string> = new Set<string>();
	activeGames: Set<GameRoomDto> = new Set<GameRoomDto>();
	startedActiveGames: Set<GameRoomDto> = new Set<GameRoomDto>();
	classicPlayersQueue: Array<string> = new Array<string>();
	superPlayersQueue: Array<string> = new Array<string>();

	async handleConnection(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		console.log(client.id + " is connected.");
		client.join(authenticatedUser.user.username);
		this.connnectedPlayers.add(authenticatedUser.user.username);
	}

	async handleDisconnect(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		console.log(client.id + " is disconnected.");

		this.connnectedPlayers.delete(authenticatedUser.user.username);
		this.classicPlayersQueue = this.classicPlayersQueue.filter(
			(player) => player !== authenticatedUser.user.username
		);
		this.superPlayersQueue = this.superPlayersQueue.filter(
			(player) => player !== authenticatedUser.user.username
		);
		// client.leave(authenticatedUser.user.username);
		this.activeGames.forEach((gameRoom) => {
			if (gameRoom.player1 === authenticatedUser.user.username) {
				if (!this.connnectedPlayers.has(gameRoom.player2))
					this.server.to(gameRoom.player2).emit("opponent_disconnected", gameRoom);
			} else if (gameRoom.player2 === authenticatedUser.user.username) {
				if (!this.connnectedPlayers.has(gameRoom.player1))
					this.server.to(gameRoom.player1).emit("opponent_disconnected", gameRoom);
			}
		});
	}

	@SubscribeMessage("send_request")
	async sendRequest(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRoomDto) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		if (authenticatedUser.user.username !== dto.player1)
			throw new WsException("Usage of your actual username is required");
		if (!this.connnectedPlayers.has(dto.player2))
			// this.server.rooms.has(dto.player2);
			throw new WsException("Your opponenet is not connected");

		this.server.to(dto.player2).emit("game_request", dto);
	}

	@SubscribeMessage("join_classic_queue")
	async joinClassicQueue(@ConnectedSocket() client: Socket) {
		// this is just the base functionallity, might require additional modification
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		if (this.classicPlayersQueue.find((player) => player === authenticatedUser.user.username))
			throw new WsException("You're already in the queue !");
		this.classicPlayersQueue.push(authenticatedUser.user.username);
		this.server.to(authenticatedUser.user.username).emit("added_to_queue");

		if (this.classicPlayersQueue.length >= 2) {
			const player1 = this.classicPlayersQueue.shift();
			const player2 = this.classicPlayersQueue.shift();

			const dto = await this.activateGameRoom({ player1: player1!, player2: player2! });

			this.server.to(player1!).emit("opponent_found", dto);
			this.server.to(player2!).emit("opponent_found", dto);
		}
	}

	@SubscribeMessage("join_super_queue")
	async joinSuperQueue(@ConnectedSocket() client: Socket, @MessageBody() powerUp: string) {
		// this is just the base functionallity, might require additional modification
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		if (this.superPlayersQueue.find((player) => player === authenticatedUser.user.username))
			throw new WsException("You're already in the queue !");
		this.superPlayersQueue.push(authenticatedUser.user.username);
		this.server.to(authenticatedUser.user.username).emit("added_to_queue");

		if (this.superPlayersQueue.length >= 2) {
			const player1 = this.superPlayersQueue.shift();
			const player2 = this.superPlayersQueue.shift();

			const dto = await this.activateGameRoom({
				player1: player1!,
				player2: player2!,
				powerUp: powerUp,
			});

			this.server.to(player1!).emit("opponent_found", dto);
			this.server.to(player2!).emit("opponent_found", dto);
		}
	}

	async activateGameRoom(dto: GameRoomDto) {
		const { player1, player2, matchId, ...otherInfo } = dto;
		const matchHistory = await this.matchHistoryService.create(otherInfo);

		dto.matchId = matchHistory.id;
		this.activeGames.add(dto);
		return dto;
	}

	@SubscribeMessage("accept_request")
	async acceptRequest(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRoomDto) {
		client;

		dto = await this.activateGameRoom(dto);

		this.server.to(dto.player1).emit("request_accepted", dto);
		this.server.to(dto.player2).emit("request_accepted", dto);
	}

	@SubscribeMessage("deny_request")
	async denyRequest(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRoomDto) {
		client;
		this.server.to(dto.player1).emit("request_denied", dto);
	}

	@SubscribeMessage("end_game")
	async endGame(@ConnectedSocket() client: Socket, @MessageBody() dto: MatchResultDto) {
		// this is just the base functionallity, might require additional modification
		client;
		await this.matchHistoryService.recordResults(dto);
		// update the user's eloRating and level

		this.activeGames.forEach((gameRoom) => {
			if (gameRoom.matchId == dto.Player1.matchId) this.activeGames.delete(gameRoom);
		});

		if (this.connnectedPlayers.has(dto.Player1.username))
			this.server.to(dto.Player1.username).emit("game_ended", dto);
		if (this.connnectedPlayers.has(dto.Player2.username))
			this.server.to(dto.Player2.username).emit("game_ended", dto);
	}

	@SubscribeMessage("broadcast_movement")
	async broadcastMovment(@ConnectedSocket() client: Socket, @MessageBody() dto: PlayerMovementDto) {
		client;

		let activeGame;
		this.activeGames.forEach((element) => {
			if (element.matchId === dto.matchId) activeGame = element;
		});
		if (!activeGame) throw new WsException("You're not in an active game !");

		this.server.to(dto.target).emit("player_moved", dto);
	}
	@SubscribeMessage("is_game_started")
	async isGameStarted(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRoomDto) {
		client;
		if (this.startedActiveGames.has(dto)) {
			this.server.to(dto.player1).emit("game_started", dto);
			this.server.to(dto.player2).emit("game_started", dto);
			this.startedActiveGames.delete(dto);
		} else this.startedActiveGames.add(dto);
	}
}
