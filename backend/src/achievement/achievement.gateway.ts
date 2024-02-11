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
import { AchievementService } from "./achievement.service";

@WebSocketGateway({ namespace: "notifications" })
@UsePipes(WsValidationPipe)
@UseFilters(WsExceptionFilter)
@UseGuards(WsAuthenticatedGuard)
export class AchievementGateway {
	@WebSocketServer()
	private readonly server: Server;

	constructor(private readonly achievementService: AchievementService) {}

	@SubscribeMessage("award_achievement")
	async handleFriendRequest(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;
		const result = await this.achievementService.awardAchievement(
			payload,
			authenticatedUser.user.username
		);
		this.server.to(authenticatedUser.user.username).emit("achievement_awarded", result);
	}
}
