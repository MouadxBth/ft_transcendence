import {
	SubscribeMessage,
	WebSocketGateway,
	ConnectedSocket,
	MessageBody,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageDto } from "../dto/message.dto";
import { ChannelMessageService } from "./channel-message.service";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { Request } from "express";
import { ChannelEvent } from "../channel.event";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelMessageGateway {
	constructor(private readonly channelMessageService: ChannelMessageService) {}

	@WebSocketServer()
	private readonly server: Server;

	@SubscribeMessage(ChannelEvent.SEND_MESSAGE)
	async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() messageBody: MessageDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const message = await this.channelMessageService.create(user.username, messageBody);

		this.server.to(messageBody.channelName).emit("recieve_message", message);
	}
}
