import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayConnection,
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
import { CreateChannelDto } from "../dto/create-channel.dto";
import { ChannelMemberService } from "../member/channel-member.service";
import { JoinChannelDto } from "../dto/join-channel.dto";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelGateway implements OnGatewayConnection {
	constructor(
		private readonly channelMessageService: ChannelMessageService,
		private readonly channelService: ChannelService,
		private readonly channelMemberService: ChannelMemberService
	) {}

	@WebSocketServer()
	private readonly server: Server;

	async handleConnection(@ConnectedSocket() client: Socket) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		//rejoin the user to all the rooms of the channels they're a member of
		(await this.channelService.findUserChannels(user.username)).map((channel) =>
			client.join(channel.name)
		);

		client.join(user.username);
	}

	@SubscribeMessage("send_message")
	async sendMessage(@ConnectedSocket() client: Socket, @MessageBody() messageBody: MessageDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const result = await this.channelMessageService.verifyMessage(user.username, messageBody);

		console.log("HERE");

		if (result.members[0]) {
			const message = await this.channelMessageService.createMessage(
				result.members[0].id,
				messageBody
			);
			this.server.to(messageBody.channelName).emit("recieve_message", message);

			console.log("HERE 2");
		}
	}

	// for debugging purposes
	@SubscribeMessage("receive_message")
	recieveMessage(@ConnectedSocket() client: Socket, @MessageBody() message: string) {
		console.log("socket with id:" + client.id + " sent this: " + message);
	}

	@SubscribeMessage("create_channel")
	async createChannel(@ConnectedSocket() client: Socket, @MessageBody() channel: CreateChannelDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const creationResult = await this.channelService.create(channel, user);

		this.server.to(user.username).emit("channel_created", creationResult);

		await this.joinChannel(client, {
			channel: channel.name,
			password: channel.password,
		} satisfies JoinChannelDto);
	}

	@SubscribeMessage("delete_channel")
	async deleteChannel(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const deletionResult = await this.channelService.remove(channelName, user.username);

		this.server.to(deletionResult.owner.username).emit("channel_deleted", deletionResult);
	}

	@SubscribeMessage("join_channel")
	async joinChannel(@ConnectedSocket() client: Socket, @MessageBody() joinDto: JoinChannelDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const joinResult = await this.channelMemberService.join(user.username, joinDto);
		const channelUpdate = await this.channelService.findOne(joinDto.channel);

		// this.server.to(user.username).emit("joined_channel", joinResult);
		client.join(joinDto.channel);

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("member_joined", channelUpdate, {
				user: {
					username: user.username,
					nickname: user.nickname,
					avatar: user.avatar,
				},
				admin: joinResult.admin,
				muted: joinResult.muted,
				id: joinResult.id,
			});
		});
	}

	@SubscribeMessage("leave_channel")
	async leaveChannel(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const leaveResult = await this.channelMemberService.leave(user.username, channelName);
		const channelUpdate = await this.channelService.findOne(channelName);

		client.leave(channelName);

		this.server.to(user.username).emit("member_left", channelUpdate, {
			user: {
				username: user.username,
				nickname: user.nickname,
				avatar: user.avatar,
			},
			admin: leaveResult.admin,
			muted: leaveResult.muted,
			id: leaveResult.id,
		});

		if (channelUpdate.owner.username === user.username) {
			this.deleteChannel(client, channelName);
		}

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("member_left", channelUpdate, {
				user: {
					username: user.username,
					nickname: user.nickname,
					avatar: user.avatar,
				},
				admin: leaveResult.admin,
				muted: leaveResult.muted,
				id: leaveResult.id,
			});
		});
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

	@SubscribeMessage("messages")
	async getMessage(@ConnectedSocket() client: Socket, @MessageBody() channel: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const result = await this.channelMessageService.findLastSent(channel, -1, 10);

		// const joinResult = await this.channelMemberService.join(user.username, joinDto);
		// const channelUpdate = await this.channelService.findOne(joinDto.channel);

		// this.server.to(user.username).emit("joined_channel", joinResult);

		this.server.to(user.username).emit("messages_result", result);
	}
}
