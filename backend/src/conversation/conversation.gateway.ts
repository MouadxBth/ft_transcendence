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
import { DirectMessageDto } from "./dto/direct-message.dto";
import { DirectMessageService } from "./direct-message/direct-message.service";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@WebSocketGateway({
	namespace: "conversation",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ConversationGateway implements OnGatewayConnection {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly directMessageService: DirectMessageService) {}

	async handleConnection(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		client.join(authenticatedUser.user.username);
	}

	@SubscribeMessage("send_message")
	async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: DirectMessageDto) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;

		await this.directMessageService.create(authenticatedUser.user.username, payload);

		this.server.to(payload.target).emit("receive_message", payload);
	}
}
