import {
	SubscribeMessage,
	WebSocketGateway,
	OnGatewayConnection,
	ConnectedSocket,
	MessageBody,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChannelService } from "../channel.service";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { Request } from "express";
import { CreateChannelDto } from "../dto/create-channel.dto";
import { ChannelEvent } from "../channel.event";
import { JoinChannelDto } from "../dto/join-channel.dto";
import { ChannelMemberService } from "../member/channel-member.service";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelGateway implements OnGatewayConnection {
	constructor(
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

	@SubscribeMessage(ChannelEvent.CREATE)
	async createChannel(@ConnectedSocket() client: Socket, @MessageBody() channel: CreateChannelDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const creationResult = await this.channelService.create(channel, user);

		this.server.to(user.username).emit("channel_created", creationResult);

		await this.joinChannel(client, {
			channel: channel.name,
			password: channel.password,
		} satisfies JoinChannelDto);
	}

	@SubscribeMessage(ChannelEvent.DELETE)
	async deleteChannel(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const deletionResult = await this.channelService.delete(channelName, user.username);

		this.server.to(deletionResult.owner.username).emit("channel_deleted", deletionResult);
	}

	@SubscribeMessage(ChannelEvent.JOIN)
	async joinChannel(@ConnectedSocket() client: Socket, @MessageBody() joinDto: JoinChannelDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const joinResult = await this.channelMemberService.join(user.username, joinDto);
		const channelUpdate = await this.channelService.findOne(joinDto.channel);

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

	@SubscribeMessage(ChannelEvent.LEAVE)
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
}
