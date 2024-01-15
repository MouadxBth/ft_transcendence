import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayConnection,
	OnGatewayDisconnect,
	ConnectedSocket,
	MessageBody,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageDto } from "../dto/message.dto";
import { ChannelMessageService } from "../message/channel-message.service";
import { ChannelService } from "../channel.service";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { Request } from "express";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private readonly channelMessageService: ChannelMessageService,
		private readonly channelService: ChannelService
	) {}

	@WebSocketServer()
	private readonly server: Server;

	async handleConnection(@ConnectedSocket() client: Socket) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;

		console.log("socket with id:" + client.id + " is connected");
		//rejoin the user to all the rooms of the channels they're a member of
		(await this.channelService.findUserChannels(authenticatedUser.user)).map((channel) =>
			client.join(channel.name)
		);
	}

	handleDisconnect(@ConnectedSocket() client: Socket) {
		console.log("socket with id:" + client.id + " is disconnected");
	}

	@SubscribeMessage("send_message")
	async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() messageBody: MessageDto) {
		const authenticatedUser = (client.request as Request).user as AuthenticatedUser;
		await this.channelMessageService.verifyMessage(authenticatedUser, messageBody);
		const message = await this.channelMessageService.createMessage(authenticatedUser, messageBody);
		this.server.to(messageBody.channelName).emit("recieve_message", message);
	}

	// for debugging purposes
	@SubscribeMessage("receive_message")
	recieveMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string) {
		console.log("socket with id:" + client.id + " sent this: " + message);
	}

	@SubscribeMessage("join_room")
	joinRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
		client.join(channelName);
		this.server.to(channelName).emit("client_joined_channel", client.id);
	}

	@SubscribeMessage("leave_room")
	leaveRoom(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
		client.leave(channelName);
		this.server.to(channelName).emit("client_left_channel", client.id);
	}
}
