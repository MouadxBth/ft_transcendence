import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { OnlineStatusService } from "src/online-status/online-status.service";
import { GameService } from "src/game/game.service";
import { type Request } from "express";
import { GameRequestDto } from "src/game/dto/game-request.dto";
import { Game } from "src/game/entities/game.entity";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private readonly server: Server;

	constructor(
		private readonly onlineStatusService: OnlineStatusService,
		private readonly gameService: GameService
	) {}

	handleConnection(client: Socket, ..._args: any[]) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;

		this.onlineStatusService.updateOnlineStatus(user.username, "Online");

		client.join(user.username);

		this.server.emit("connected", user);
	}

	handleDisconnect(client: Socket) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;

		this.onlineStatusService.updateOnlineStatus(user.username, "Offline");

		const { sentResult, receiveResult } = this.gameService.removePlayer(user.username);

		// WARNING: Super confusing stuff ahead

		// request sent by user to another, member should have their receive list updated
		if (sentResult) {
			const receivedRequests = this.gameService.getReceivedRequests(sentResult.target.username);

			this.server
				.to(sentResult.target.username)
				.emit("challenger_disconnected", sentResult.sender, receivedRequests);
		}

		// request sent by another to user, member should have their sent list updated
		if (receiveResult) {
			receiveResult.forEach((game) => {
				this.server.to(game.sender.username).emit("opponent_disconnected", game);
			});
		}

		client.leave(user.username);

		this.server.emit("disconnected", user);
	}

	@SubscribeMessage("send_match_request")
	async sendRequest(@ConnectedSocket() client: Socket, @MessageBody() dto: GameRequestDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const result = await this.gameService.sendRequest(user, dto.target, dto.superMatch);

		const sentRequest = this.gameService.getSentRequest(user.username);
		const receivedRequests = this.gameService.getReceivedRequests(dto.target);

		this.server.to(user.username).emit("sent_request_update", sentRequest);
		this.server.to(dto.target).emit("received_requests_update", receivedRequests);

		this.server.to(user.username).emit("sent_match_request", result);
		this.server.to(dto.target).emit("receive_match_request", result);
	}

	@SubscribeMessage("accept_match_request")
	async acceptRequest(@ConnectedSocket() client: Socket, @MessageBody() sender: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const result = await this.gameService.acceptRequest(sender, user);

		this.server.to(sender).emit("match_request_accepted", result);
		this.server.to(user.username).emit("accepted_match_request", result);

		this.server.emit("status_update", sender, this.onlineStatusService.onlineStatus(sender));
		this.server.emit(
			"status_update",
			user.username,
			this.onlineStatusService.onlineStatus(user.username)
		);
	}

	@SubscribeMessage("decline_match_request")
	async declineRequest(@ConnectedSocket() client: Socket, @MessageBody() sender: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const result = this.gameService.declineRequest(sender, user.username);

		this.server.to(sender).emit("match_request_declined", result);
		this.server.to(user.username).emit("declined_match_request", result);
	}

	@SubscribeMessage("update_online_status")
	async updateStatus(@ConnectedSocket() _client: Socket, @MessageBody() user: string) {
		this.server.emit("status_update", user, this.onlineStatusService.onlineStatus(user));
	}

	@SubscribeMessage("join_queue")
	async joinQueue(@ConnectedSocket() client: Socket, @MessageBody() superMatch: boolean) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const result = superMatch
			? await this.gameService.joinSuperQueue(user)
			: await this.gameService.joinClassicQueue(user);

		this.server.to(user.username).emit("joined_queue");

		if (typeof result === "object") {
			const first = result.player1.user.username;
			const second = result.player2.user.username;

			this.server.to(first).emit("opponent_found", result as Game);
			this.server.to(second).emit("opponent_found", result as Game);

			this.server.emit("status_update", first, this.onlineStatusService.onlineStatus(first));
			this.server.emit("status_update", second, this.onlineStatusService.onlineStatus(second));
		}
	}
}
