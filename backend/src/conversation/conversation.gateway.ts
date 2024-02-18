import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { UserService } from "src/user/user.service";
import { ConversationService } from "./conversation.service";
import { ConversationEvent } from "./conversation.event";

@WebSocketGateway({
	namespace: "conversation",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ConversationGateway implements OnGatewayConnection {
	@WebSocketServer()
	private readonly server: Server;

	constructor(
		private readonly conversationService: ConversationService,
		private readonly userService: UserService
	) {}

	async handleConnection(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		client.join(authenticatedUser.user.username);
	}

	@SubscribeMessage(ConversationEvent.CreateConversation)
	async create(@ConnectedSocket() client: Socket, @MessageBody() targetNickname: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const targetUser = await this.userService.search(targetNickname);

		if (targetUser.length !== 1 || !targetUser[0]) {
			throw new WsException("User with that nickname was not found!");
		}

		const createdConversation = await this.conversationService.create(user, targetUser[0].username);

		this.server.to(user.username).emit("conversation_created", createdConversation);
		this.server.to(targetUser[0].username).emit("conversation_added", {
			...createdConversation,
			sender: createdConversation.target,
			target: createdConversation.sender,
		});
	}

	@SubscribeMessage(ConversationEvent.DeleteConversation)
	async delete(@ConnectedSocket() client: Socket, @MessageBody() targetUsername: string) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;

		const deletedConversation = await this.conversationService.delete(user, targetUsername);

		this.server.to(user.username).emit("conversation_deleted", deletedConversation);
		this.server.to(targetUsername).emit("conversation_removed", {
			...deletedConversation,
			sender: deletedConversation.target,
			target: deletedConversation.sender,
		});
	}
}
