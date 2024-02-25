import {
	SubscribeMessage,
	WebSocketGateway,
	ConnectedSocket,
	MessageBody,
	WebSocketServer,
	WsException,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UseFilters, UseGuards, UsePipes } from "@nestjs/common";
import { WsValidationPipe } from "src/socket-io/ws-validation.pipe";
import { WsExceptionFilter } from "src/socket-io/ws-exception.filter";
import { WsAuthenticatedGuard } from "src/auth/guards/ws-authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { Request } from "express";
import { AdminOperationsDto } from "../dto/admin-operations.dto";
import { UserService } from "src/user/user.service";
import { ChannelAdminService } from "./channel-admin.service";
import { ChannelService } from "../channel.service";
import { ChannelEvent } from "../channel.event";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelAdminGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(
		private readonly channelAdminService: ChannelAdminService,
		private readonly channelService: ChannelService,
		private readonly userService: UserService
	) {}

	@SubscribeMessage(ChannelEvent.INVITE)
	async invite(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const inviteResult = await this.channelAdminService.invite(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		this.server.to(user.username).emit("invite_successful", inviteResult.invited);
		this.server.to(userResult[0]!.username).emit("invited_to_channel", {
			channel: dto.channel,
			sender: user.nickname,
		});
	}

	@SubscribeMessage(ChannelEvent.KICK)
	async kick(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const kickResult = await this.channelAdminService.kick(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		const channelUpdate = await this.channelService.findOne(dto.channel);

		this.server.to(user.username).emit("kick_successful", true);
		this.server.to(userResult[0]!.username).emit("kicked_from_channel", {
			channel: dto.channel,
			sender: user.nickname,
		});

		this.server.to(userResult[0]!.username).emit("member_left", channelUpdate, kickResult);

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("member_left", channelUpdate, kickResult);
		});
	}

	@SubscribeMessage(ChannelEvent.BAN)
	async ban(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const banResult = await this.channelAdminService.ban(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		this.server.to(user.username).emit("ban_successful", true);
		this.server.to(userResult[0]!.username).emit("banned_from_channel", {
			channel: dto.channel,
			sender: user.nickname,
		});

		const channelUpdate = await this.channelService.findOne(dto.channel);

		this.server.to(userResult[0]!.username).emit("member_left", channelUpdate, banResult);

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("member_left", channelUpdate, banResult);
		});
	}

	@SubscribeMessage(ChannelEvent.UNBAN)
	async unban(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const unbanResult = await this.channelAdminService.unban(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		this.server.to(user.username).emit("unban_successful", unbanResult.banned);

		if (unbanResult.banned) {
			this.server.to(userResult[0]!.username).emit("unbanned_from_channel", {
				channel: dto.channel,
				sender: user.nickname,
			});
		}
	}

	private async unmuteUser(client: Socket, dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		try {
			const timeout = this.channelService.mutedUsers.get(userResult[0]!.username);

			if (timeout) {
				this.channelService.mutedUsers.delete(userResult[0]!.username);
			}

			const unmuteResult = await this.channelAdminService.unmute(user.username, {
				...dto,
				member: userResult[0]!.username,
			});

			const channelUpdate = await this.channelService.findOne(dto.channel);

			channelUpdate.members.forEach((member) => {
				this.server
					.to(member.user.username)
					.emit("unmuted_on_channel", channelUpdate, unmuteResult, {
						channel: dto.channel,
						sender: user.nickname,
						duration: dto.duration,
					});
			});
		} catch (error: unknown) {}
	}

	@SubscribeMessage(ChannelEvent.MUTE)
	async mute(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;

		if (!dto.duration || dto.duration <= 0) {
			throw new WsException("Invalid duration!");
		}

		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const muteResult = await this.channelAdminService.mute(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		this.channelService.mutedUsers.set(userResult[0]!.username, {
			channel: dto.channel,
			timeout: setTimeout(async () => {
				await this.unmuteUser(client, dto);
			}, dto.duration * 1e3),
		});

		const channelUpdate = await this.channelService.findOne(dto.channel);

		this.server.to(user.username).emit("mute_successful", muteResult);

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("muted_on_channel", channelUpdate, muteResult, {
				channel: dto.channel,
				sender: user.nickname,
				duration: dto.duration,
			});
		});
	}

	@SubscribeMessage(ChannelEvent.UNMUTE)
	async unmute(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.find(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const timeout = this.channelService.mutedUsers.get(userResult[0]!.username);

		if (timeout && timeout.channel === dto.channel) {
			clearTimeout(timeout.timeout);
		}

		const unmuteResult = await this.channelAdminService.unmute(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		this.server.to(user.username).emit("unmute_successful", unmuteResult);

		const channelUpdate = await this.channelService.findOne(dto.channel);

		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("unmuted_on_channel", channelUpdate, unmuteResult, {
				channel: dto.channel,
				sender: user.nickname,
				duration: dto.duration,
			});
		});
	}
}
