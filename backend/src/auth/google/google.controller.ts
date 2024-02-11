import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleGuard } from "./guards/google.guard";
import type { Request, Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { GoogleService } from "./google.service";

@ApiTags("Auth | Google")
@Controller("auth/google")
export class GoogleController {
	constructor(private readonly service: GoogleService) {}

	@Get("login")
	@UseGuards(GoogleGuard)
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
	async googleLogin(@Req() req: Request) {
		return req.user;
	}

	@Get("redirect")
	@UseGuards(GoogleGuard)
	@ApiOperation({
		summary: "Google OAuth 2.0 Callback URL",
		description: "Used as a redirection of the Google OAuth 2.0 provider a user",
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
	async googleRedirect(@Res() res: Response) {
		return this.service.redirect(res);
	}
}
