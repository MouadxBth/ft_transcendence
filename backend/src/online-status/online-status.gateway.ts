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

@WebSocketGateway({ namespace: "online-status" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class OnlineStatusGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	private readonly server: Server;

	handleConnection(client: Socket, ..._args: any[]) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		this.server.emit("connected", authenticatedUser.user.username);
	}

	handleDisconnect(client: Socket) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		this.server.emit("disconnected", authenticatedUser.user.username);
	}
}
