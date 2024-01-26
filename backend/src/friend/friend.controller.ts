import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import type { Request } from "express";
import {
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiInternalServerErrorResponse,
	ApiCreatedResponse,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Friend")
@Controller("friend")
@UseGuards(AuthenticatedGuard)
export class FriendController {
	constructor(private readonly friendService: FriendService) {}

	@Get("/")
	@ApiOkResponse({ description: "Friends retrieved successfully." })
	async friends(@Req() request: Request) {
		return this.friendService.friends((request.user! as AuthenticatedUser).user.username);
	}

	@Get("sent")
	@ApiOkResponse({ description: "Sent friend requests retrieved successfully." })
	async sentFriendRequests(@Req() request: Request) {
		return this.friendService.sentFriendRequests(
			(request.user! as AuthenticatedUser).user.username
		);
	}

	@Get("received")
	@ApiOkResponse({ description: "Received friend requests retrieved successfully." })
	async receivedFriendRequests(@Req() request: Request) {
		return this.friendService.receivedFriendRequests(
			(request.user! as AuthenticatedUser).user.username
		);
	}

	@Post(":target/send")
	@ApiBadRequestResponse({ description: "Cannot send a friend request to yourself!" })
	@ApiBadRequestResponse({ description: "Target is already a friend of you!" })
	@ApiBadRequestResponse({ description: "Request already sent!" })
	@ApiInternalServerErrorResponse({ description: "Unable to send a friend request." })
	@ApiCreatedResponse({ description: "Friend request sent successfully." })
	async sendFriendRequest(@Param("target") target: string, @Req() request: Request) {
		return this.friendService.sendFriendRequest(
			(request.user! as AuthenticatedUser).user.username,
			target
		);
	}

	@Post(":target/accept")
	@ApiBadRequestResponse({ description: "Cannot accept a friend request to yourself!" })
	@ApiBadRequestResponse({ description: "Target is already a friend of you!" })
	@ApiBadRequestResponse({ description: "No request from target to accept!" })
	@ApiInternalServerErrorResponse({ description: "Unable to accept the friend request." })
	@ApiOkResponse({ description: "Friend request accepted successfully." })
	async acceptFriendRequest(@Param("target") target: string, @Req() request: Request) {
		return this.friendService.acceptFriendRequest(
			(request.user! as AuthenticatedUser).user.username,
			target
		);
	}

	@Post(":target/deny")
	@ApiBadRequestResponse({ description: "Cannot deny a friend request to yourself!" })
	@ApiBadRequestResponse({ description: "Target is already a friend of you!" })
	@ApiBadRequestResponse({ description: "No request from target to accept!" })
	@ApiInternalServerErrorResponse({ description: "Unable to deny the friend request." })
	@ApiOkResponse({ description: "Friend request denied successfully." })
	async denyFriendRequest(@Param("target") target: string, @Req() request: Request) {
		return this.friendService.denyFriendRequest(
			(request.user! as AuthenticatedUser).user.username,
			target
		);
	}

	@Delete(":target")
	@ApiBadRequestResponse({ description: "Cannot unfriend yourself!" })
	@ApiBadRequestResponse({ description: "Target is not your friend!" })
	@ApiInternalServerErrorResponse({ description: "Unable to unfriend user." })
	@ApiOkResponse({ description: "User unfriended successfully." })
	async unFriendUser(@Param("target") target: string, @Req() request: Request) {
		return this.friendService.unfriendUser(
			(request.user! as AuthenticatedUser).user.username,
			target
		);
	}
}
