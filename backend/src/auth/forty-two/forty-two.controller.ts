import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { FortyTwoGuard } from "./guards/forty-two.guard";
import { type Request, type Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { FortyTwoService } from "./forty-two.service";

@ApiTags("Auth | 42")
@Controller("auth/42")
export class FortyTwoController {
	constructor(private readonly service: FortyTwoService) {}

	@Get("login")
	@UseGuards(FortyTwoGuard)
	@ApiOperation({
		summary: "Login/Authenticate a user",
		description: "Used to Login/Authenticate a user",
	})
	@ApiResponse({
		type: User,
		status: HttpStatus.CREATED,
		description: "Authenticated User's profile",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "If the user's credentials don't match, a Unauthorized exception will be returned",
	})
	async fortyTwoLogin(@Req() req: Request) {
		return req.user;
	}

	@Get("redirect")
	@UseGuards(FortyTwoGuard)
	@ApiOperation({
		summary: "42 OAuth 2.0 Callback URL",
		description: "Used as a redirection of the 42 OAuth 2.0 provider a user",
	})
	@ApiResponse({
		type: User,
		status: HttpStatus.CREATED,
		description: "Authenticated User's profile",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "If the user's credentials don't match, a Unauthorized exception will be returned",
	})
	async fortyTwoRedirect(@Res() res: Response) {
		return this.service.redirect(res);
	}
}
