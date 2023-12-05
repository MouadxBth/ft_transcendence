import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { type Request } from "express";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiInternalServerErrorResponse,
	ApiTags,
} from "@nestjs/swagger";

@ApiTags("Conversation")
@Controller("conversation")
@UseGuards(AuthenticatedGuard)
export class ConversationController {
	constructor(private readonly conversationService: ConversationService) {}

	@Post(":target")
	@ApiBadRequestResponse({ description: "Cannot create a conversation with yourself!" })
	@ApiBadRequestResponse({ description: "Conversation already exists!" })
	@ApiCreatedResponse({ description: "The conversation has been successfully created." })
	async create(@Param("target") target: string, @Req() req: Request) {
		return this.conversationService.create((req.user! as AuthenticatedUser).user.username, target);
	}

	@Get(":target")
	@ApiBadRequestResponse({ description: "Cannot find a conversation with yourself!" })
	@ApiNotFoundResponse({ description: "Conversation does not exist!" })
	@ApiOkResponse({ description: "The conversation has been successfully found." })
	async findOne(@Param("target") target: string, @Req() req: Request) {
		return this.conversationService.findOne((req.user! as AuthenticatedUser).user.username, target);
	}

	@Get("/")
	@ApiOkResponse({ description: "All conversations have been successfully retrieved." })
	async findAll(@Req() req: Request) {
		return this.conversationService.findAll((req.user! as AuthenticatedUser).user.username);
	}

	@Delete(":target")
	@ApiBadRequestResponse({ description: "Cannot delete a conversation with yourself!" })
	@ApiBadRequestResponse({ description: "Conversation does not exist!" })
	@ApiInternalServerErrorResponse({ description: "Unable to delete conversation!" })
	@ApiOkResponse({ description: "The conversation has been successfully deleted." })
	async delete(@Param("target") target: string, @Req() req: Request) {
		return this.conversationService.delete((req.user! as AuthenticatedUser).user.username, target);
	}
}
