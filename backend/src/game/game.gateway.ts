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
import { MatchHistoryService } from "./match-history/match-history.service";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { GameRoomDto, PlayerMovementDto } from "./dto/game.dto";
import { MatchResultDto } from "./dto/match-result.dto";

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
	playersQueue: Array<string> = new Array<string>();

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

	@SubscribeMessage("join_game_queue")
	async joinGameQueue(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		if (this.playersQueue.find((player) => player === authenticatedUser.user.username))
			throw new WsException("You're already in the queue !");
		this.playersQueue.push(authenticatedUser.user.username);
		this.server.to(authenticatedUser.user.username).emit("added_to_queue");

		if (this.playersQueue.length >= 2) {
			const player1 = this.playersQueue.shift();
			const player2 = this.playersQueue.shift();

			const gameRoom = {
				player1: player1,
				player2: player2,
				time: 10000,
				winningPoints: 30,
			} as GameRoomDto;

			this.acceptRequest(client, gameRoom);
		}
	}

	@SubscribeMessage("accept_request")
	async acceptRequest(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRoomDto) {
		client;
		const { player1, player2, matchId, ...otherInfo } = dto;
		const matchHistory = await this.matchHistoryService.create(otherInfo);

		dto.matchId = matchHistory.id;
		this.activeGames.add(dto);

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
		client;

		await this.matchHistoryService.recordResults(dto);

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

		this.server.to(dto.target).emit("player_moved", dto);
	}
}

// events to handle:
//          - send_request
//          - accept_request
//          - deny_request
//          - join_game_queue
//          - end_game
//          - broadcast_movement
// on a socket connection, register the player in their own room and add them to the connected players
// on a socket disconnection, remove them from the connected players and if they were in a game make them draw from it

// Certain questions i encounterd with this architecture:
//		-what if the two players in a game get disconnected at the same time ?
//		-how do we make sure both players started the timer at the same time ?
//		-is broadcast_movement all we gonna need to implement the multiplayer functionality ?
//		-after the request_accepted event is emitted, are we gonna need confirmation events between clients to confirm the start of a counter before the games actually starts ?
