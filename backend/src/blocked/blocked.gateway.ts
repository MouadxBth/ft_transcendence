import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { type Request } from "express";
import { BlockedService } from "./blocked.service";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class BlockedGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly blockedService: BlockedService) {}

	@SubscribeMessage("block_user")
	async handleBlock(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		const result = await this.blockedService.block(authenticatedUser.user.username, payload);
		this.server.to(result.senderId).emit("user_blocked", result);
		this.server.to(result.targetId).emit("user_blocked", result);
	}

	@SubscribeMessage("unblock_user")
	async handleUnblock(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		const result = await this.blockedService.unblock(authenticatedUser.user.username, payload);
		this.server.to(result.senderId).emit("user_unblocked", result);
		this.server.to(result.targetId).emit("user_unblocked", result);
	}
}
