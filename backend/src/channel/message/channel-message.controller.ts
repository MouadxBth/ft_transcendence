import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { ChannelMessageService } from "./channel-message.service";
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { type Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@ApiTags("Channel | Messages")
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
		@Req() req: Request,
		@Param("channel") channel: string,
		@Query("cursor") cursor: string | undefined,
		@Query("quantity") quantity: string | undefined
	) {
		if (quantity) {
			const parsedCursor = parseInt(cursor ?? "-1");

			if (Number.isNaN(parsedCursor))
				throw new HttpException("Invalid cursor query value!", HttpStatus.BAD_REQUEST);

			const parsedQuantity = parseInt(quantity);

			if (Number.isNaN(parsedQuantity))
				throw new HttpException("Invalid quantity query value!", HttpStatus.BAD_REQUEST);

			return await this.channelMessageService.findLastSent(
				(req.user as AuthenticatedUser).user.username,
				channel,
				parsedCursor,
				parsedQuantity
			);
		}
		return await this.channelMessageService.findAll(channel);
	}
}
