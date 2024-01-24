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
import { BlockStatus } from "./types/block-status.type";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class BlockedGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly blockedService: BlockedService) {}

	private invertResult(result: BlockStatus) {
		return {
			senderId: result.targetId,
			senderNickname: result.targetNickname,
			targetId: result.senderId,
			targetNickname: result.senderNickname,
			blockedBy: result.blocking,
			blocking: result.blockedBy,
		} as BlockStatus;
	}

	@SubscribeMessage("block_user")
	async handleBlock(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		const result = await this.blockedService.block(authenticatedUser.user.username, payload);
		this.server.to(result.senderId).emit("user_blocked", result);
		this.server.to(result.targetId).emit("user_blocked", this.invertResult(result));
	}

	@SubscribeMessage("unblock_user")
	async handleUnblock(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		console.log("CALLED UNBLOCK!");
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		const result = await this.blockedService.unblock(authenticatedUser.user.username, payload);
		this.server.to(result.senderId).emit("user_unblocked", result);
		this.server.to(result.targetId).emit("user_unblocked", this.invertResult(result));
	}
}
