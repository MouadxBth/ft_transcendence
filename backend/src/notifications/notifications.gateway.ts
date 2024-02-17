import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { type Request } from "express";
import { OnlineStatusService } from "src/online-status/online-status.service";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly onlineStatusService: OnlineStatusService) {}

	handleConnection(client: Socket, ..._args: any[]) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		this.onlineStatusService.updateOnlineStatus(authenticatedUser.user.username, "Online");
		client.join(authenticatedUser.user.username);
		this.server.emit("connected", authenticatedUser.user);
	}

	handleDisconnect(client: Socket) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		this.onlineStatusService.updateOnlineStatus(authenticatedUser.user.username, "Offline");
		client.leave(authenticatedUser.user.username);
		this.server.emit("disconnected", authenticatedUser.user);
	}
}
