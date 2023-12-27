import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Patch,
	Put,
	Query,
	Req,
	UseGuards,
} from "@nestjs/common";
import { DirectMessageService } from "./direct-message.service";
import { AuthenticatedGuard } from "src/auth/guards/authenticated.guard";
import { type Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiTags,
} from "@nestjs/swagger";
import { UpdateDirectMessageDto } from "../dto/update-direct-message.dto";

@ApiTags("Conversation | Direct Messages")
@Controller("conversation")
@UseGuards(AuthenticatedGuard)
export class DirectMessageController {
	constructor(private readonly directMessageService: DirectMessageService) {}

	@Put(":target/dms")
	@ApiOkResponse({ description: "Direct messages have been successfully retrieved." })
	@ApiNotFoundResponse({ description: "Direct Message does not exist!" })
	@ApiInternalServerErrorResponse({ description: "Unable to update the direct message!" })
	@ApiNoContentResponse({ description: "The direct message has been successfully updated." })
	async update(
		@Param("target") target: string,
		@Req() req: Request,
		@Body() updateDto: UpdateDirectMessageDto
	) {
		const authenticatedUser = req.user! as AuthenticatedUser;

		const result = await this.directMessageService.update(
			authenticatedUser.user.username,
			target,
			updateDto
		);

		if (!result)
			throw new HttpException(
				"Unable to update the direct message!",
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		return result;
	}

	@Get(":target/dms")
	@ApiBadRequestResponse({ description: "Invalid query query values!" })
	@ApiOkResponse({ description: "Direct messages have been successfully retrieved." })
	async findMany(
		@Param("target") target: string,
		@Query("cursor") cursor: string | undefined,
		@Query("quantity") quantity: string | undefined,
		@Req() req: Request
	) {
		const authenticatedUser = req.user! as AuthenticatedUser;

		if (cursor && quantity) {
			const parsedCursor = parseInt(cursor);

			if (Number.isNaN(parsedCursor))
				throw new HttpException("Invalid cursor query value!", HttpStatus.BAD_REQUEST);

			const parsedQuantity = parseInt(quantity);

			if (Number.isNaN(parsedQuantity))
				throw new HttpException("Invalid quantity query value!", HttpStatus.BAD_REQUEST);

			return this.directMessageService.findLastSent(
				authenticatedUser.user.username,
				target,
				parsedCursor,
				parsedQuantity
			);
		}
		return this.directMessageService.findAll(authenticatedUser.user.username, target);
	}

	@Patch(":target/dms")
	@ApiBadRequestResponse({ description: "Missing query parameters!" })
	@ApiBadRequestResponse({ description: "Invalid query query values!" })
	@ApiCreatedResponse({ description: "The direct message has been successfully updated." })
	async readLastSent(
		@Param("target") target: string,
		@Query("cursor") cursor: string | undefined,
		@Query("quantity") quantity: string | undefined,
		@Req() req: Request
	) {
		const authenticatedUser = req.user! as AuthenticatedUser;

		if (!(cursor && quantity))
			throw new HttpException("Missing query parameters!", HttpStatus.BAD_REQUEST);

		const parsedCursor = parseInt(cursor);

		if (Number.isNaN(parsedCursor))
			throw new HttpException("Invalid cursor query value!", HttpStatus.BAD_REQUEST);

		const parsedQuantity = parseInt(quantity);

		if (Number.isNaN(parsedQuantity))
			throw new HttpException("Invalid quantity query value!", HttpStatus.BAD_REQUEST);

		return this.directMessageService.readLastSent(
			authenticatedUser.user.username,
			target,
			parsedCursor,
			parsedQuantity
		);
	}

	@Delete(":target/dms/:id")
	@ApiBadRequestResponse({ description: "Invalid message id!" })
	@ApiInternalServerErrorResponse({ description: "Unable to delete the direct message!" })
	@ApiOkResponse({ description: "The direct message has been successfully deleted." })
	async delete(@Param("target") target: string, @Param("id") id: string, @Req() req: Request) {
		const parsedId = parseInt(id);

		if (Number.isNaN(parsedId))
			throw new HttpException("Invalid id parameter value!", HttpStatus.BAD_REQUEST);

		return this.directMessageService.delete(
			(req.user! as AuthenticatedUser).user.username,
			target,
			parsedId
		);
	}
}
