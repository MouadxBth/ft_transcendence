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
import { FriendService } from "src/friend/friend.service";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class FriendGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly friendService: FriendService) {}

	@SubscribeMessage("send_friend_request")
	async handleFriendRequest(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		const result = await this.friendService.sendFriendRequest(username, payload);

		this.server.to(username).emit("sent_friend_request", result);
		this.server.to(payload).emit("receive_friend_request", result);
	}

	@SubscribeMessage("accept_friend_request")
	async handleAccept(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		const { createdAt, sender, target } = await this.friendService.acceptFriendRequest(
			username,
			payload
		);

		const requestResult = {
			createdAt,
			sender: {
				...sender,
				friends: undefined,
			},
			target: {
				...target,
				friends: undefined,
			},
		};

		this.server.to(payload).emit("friend_request_accepted", requestResult);
		this.server.to(username).emit("friend_request_accepted", requestResult);

		this.server.emit("friends_updated", sender);
		this.server.emit("friends_updated", target);
	}

	@SubscribeMessage("deny_friend_request")
	async handleDeny(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		const result = await this.friendService.denyFriendRequest(username, payload);

		this.server.to(username).emit("friend_request_denied", result);
		this.server.to(payload).emit("friend_request_denied", result);
	}

	@SubscribeMessage("cancel_friend_request")
	async handleCancel(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		const result = await this.friendService.cancelFriendRequest(username, payload);

		this.server.to(username).emit("friend_request_canceled", result);
		this.server.to(payload).emit("friend_request_canceled", result);
	}

	@SubscribeMessage("unfriend_request")
	async handleUnfriend(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		const { sender, target } = await this.friendService.unfriendUser(username, payload);

		const requestResult = {
			createdAt: new Date(),
			sender: {
				...sender,
				friends: undefined,
			},
			target: {
				...target,
				friends: undefined,
			},
		};

		this.server.to(username).emit("unfriend", requestResult);
		this.server.to(payload).emit("unfriend", requestResult);

		this.server.emit("friends_updated", sender);
		this.server.emit("friends_updated", target);
	}

	@SubscribeMessage("safe_deny_friend_request")
	async handleSafeDeny(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		try {
			const result = await this.friendService.denyFriendRequest(username, payload);

			this.server.to(username).emit("friend_request_denied", result);
			this.server.to(payload).emit("friend_request_denied", result);
		} catch (exception: any) {}
	}

	@SubscribeMessage("safe_cancel_friend_request")
	async handleSafeCancel(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		try {
			const result = await this.friendService.cancelFriendRequest(username, payload);

			this.server.to(username).emit("friend_request_canceled", result);
			this.server.to(payload).emit("friend_request_canceled", result);
		} catch (exception: any) {}
	}

	@SubscribeMessage("safe_unfriend_request")
	async handleSafeUnfriend(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const { username } = user;

		try {
			const { sender, target } = await this.friendService.unfriendUser(username, payload);

			const requestResult = {
				createdAt: new Date(),
				sender: {
					...sender,
					friends: undefined,
				},
				target: {
					...target,
					friends: undefined,
				},
			};

			this.server.to(username).emit("unfriend", requestResult);
			this.server.to(payload).emit("unfriend", requestResult);

			this.server.emit("friends_updated", sender);
			this.server.emit("friends_updated", target);
		} catch (exception: any) {}
	}
}
