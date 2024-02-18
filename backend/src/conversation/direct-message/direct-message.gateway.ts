import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { ConversationEvent } from "../conversation.event";
import { DirectMessageService } from "./direct-message.service";
import { DirectMessageDto } from "../dto/direct-message.dto";

@WebSocketGateway({
	namespace: "conversation",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class DirectMessageGateway implements OnGatewayConnection {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly directMessageService: DirectMessageService) {}

	async handleConnection(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		client.join(authenticatedUser.user.username);
	}

	@SubscribeMessage(ConversationEvent.SendMessage)
	async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: DirectMessageDto) {
		const { user } = (client.request as Request).user! as AuthenticatedUser;
		const createdMessage = await this.directMessageService.create(user, payload);

		this.server.to(user.username).emit("receive_message", createdMessage);
		this.server.to(payload.target).emit("receive_message", createdMessage);
	}
}
