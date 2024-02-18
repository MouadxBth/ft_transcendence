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
import { ChannelService } from "../channel.service";
import { ChannelOwnerService } from "./channel-owner.service";
import { ChannelEvent } from "../channel.event";

@WebSocketGateway({
	namespace: "channel",
})
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class ChannelOwnerGateway {
	constructor(
		private readonly channelOwnerService: ChannelOwnerService,
		private readonly channelService: ChannelService,
		private readonly userService: UserService
	) {}

	@WebSocketServer()
	private readonly server: Server;

	@SubscribeMessage(ChannelEvent.PROMOTE)
	async promote(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.search(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const promoteResult = await this.channelOwnerService.promote(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		const channelUpdate = await this.channelService.findOne(dto.channel);

		this.server.to(user.username).emit("promote_successful", true);
		channelUpdate.members.forEach((member) => {
			this.server
				.to(member.user.username)
				.emit("promoted_in_channel", channelUpdate, promoteResult, {
					channel: dto.channel,
					sender: user.nickname,
				});
		});
	}

	@SubscribeMessage(ChannelEvent.DEMOTE)
	async demote(@ConnectedSocket() client: Socket, @MessageBody() dto: AdminOperationsDto) {
		const { user } = (client.request as Request).user as AuthenticatedUser;
		const userResult = await this.userService.search(dto.member);

		if (userResult.length !== 1) {
			throw new WsException("User with that nickname was not found!");
		}

		const demoteResult = await this.channelOwnerService.demote(user.username, {
			...dto,
			member: userResult[0]!.username,
		});

		const channelUpdate = await this.channelService.findOne(dto.channel);

		this.server.to(user.username).emit("demote_successful", true);
		channelUpdate.members.forEach((member) => {
			this.server.to(member.user.username).emit("demoted_in_channel", channelUpdate, demoteResult, {
				channel: dto.channel,
				sender: user.nickname,
			});
		});
	}
}
