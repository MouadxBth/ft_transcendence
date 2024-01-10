import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ChannelMessageService } from "./channel-message.service";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelMessageController {
	constructor(private readonly channelMessageService: ChannelMessageService) {}

	@Get(":channel/messages")
	async findMany(
		@Param("channel") channel: string,
		@Query("cursor") cursor: string | undefined,
		@Query("quantity") quantity: string | undefined
	) {
		if (cursor && quantity) {
			const parsedCursor = parseInt(cursor);

			if (Number.isNaN(parsedCursor))
				throw new HttpException("Invalid cursor query value!", HttpStatus.BAD_REQUEST);

			const parsedQuantity = parseInt(quantity);

			if (Number.isNaN(parsedQuantity))
				throw new HttpException("Invalid quantity query value!", HttpStatus.BAD_REQUEST);

			return await this.channelMessageService.findLastSent(channel, parsedCursor, parsedQuantity);
		}
		return await this.channelMessageService.findAll(channel);
	}
	@Patch(":channel/messages/:id")
	async update(
		@Req() request: Request,
		@Param("channel") channel: string,
		@Param("id") id: string,
		@Body("message") message: string
	) {
		const authenticatedUser = request.user! as AuthenticatedUser;

		const parsedId = parseInt(id);

		if (Number.isNaN(parsedId))
			throw new HttpException("Invalid id parameter value!", HttpStatus.BAD_REQUEST);

		return await this.channelMessageService.update(
			authenticatedUser.user,
			channel,
			parsedId,
			message
		);
	}

	@Delete(":channel/messages/:id")
	async delete(
		@Req() request: Request,
		@Param("channel") channel: string,
		@Param("id") id: string
	) {
		const authenticatedUser = request.user! as AuthenticatedUser;

		const parsedId = parseInt(id);

		if (Number.isNaN(parsedId))
			throw new HttpException("Invalid id parameter value!", HttpStatus.BAD_REQUEST);

		return await this.channelMessageService.delete(authenticatedUser.user, channel, parsedId);
	}
	// Update
	// Delete
}
