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
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("channel")
@Controller("channel")
@UseGuards(AuthenticatedGuard)
export class ChannelMessageController {
	constructor(private readonly channelMessageService: ChannelMessageService) {}

	@Get(":channel/messages")
	@ApiOperation({ summary: "Get messages from a channel" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiQuery({ name: "cursor", description: "Cursor for pagination", required: false })
	@ApiQuery({ name: "quantity", description: "Quantity for pagination", required: false })
	@ApiResponse({ status: 200, description: "Successfully retrieved channel messages" })
	@ApiResponse({ status: 400, description: "Bad Request - Invalid cursor or quantity" })
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
	@ApiOperation({ summary: "Update a channel message" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiParam({ name: "id", description: "Message ID" })
	@ApiResponse({ status: 200, description: "Successfully updated channel message" })
	@ApiResponse({ status: 400, description: "Bad Request - Invalid ID or message is empty" })
	@ApiResponse({
		status: 403,
		description:
			"Forbidden - User is not the sender of the message or message does not belong to the channel",
	})
	@ApiBody({
		description: "a message varibale of type string in json format",
	})
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
	@ApiOperation({ summary: "Delete a channel message" })
	@ApiParam({ name: "channel", description: "Channel name" })
	@ApiParam({ name: "id", description: "Message ID" })
	@ApiResponse({ status: 200, description: "Successfully deleted channel message" })
	@ApiResponse({ status: 400, description: "Bad Request - Invalid ID" })
	@ApiResponse({
		status: 403,
		description:
			"Forbidden - User is not the sender of the message or message does not belong to the channel",
	})
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
