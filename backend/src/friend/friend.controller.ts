import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { FriendService } from "./friend.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import type { Request } from "express";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

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

	@Get("/:target")
	@ApiOkResponse({ description: "Friends of target retrieved successfully." })
	async friendsOf(@Param("target") target: string) {
		return this.friendService.friends(target);
	}

	@Get("/status/:target")
	@ApiOkResponse({ description: "Friend Status of you with target retrieved successfully." })
	async friendStatus(@Param("target") target: string, @Req() request: Request) {
		return this.friendService.friendStatus(
			(request.user! as AuthenticatedUser).user.username,
			target
		);
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
}
