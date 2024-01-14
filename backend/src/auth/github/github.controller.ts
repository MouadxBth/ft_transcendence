import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import type { Request, Response } from "express";
import { GithubGuard } from "./guards/github.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { GithubService } from "./github.service";

@ApiTags("Auth | Github")
@Controller("auth/github")
export class GithubController {
	constructor(private readonly service: GithubService) {}

	@Get("login")
	@UseGuards(GithubGuard)
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
	async githubLogin(@Req() req: Request) {
		return req.user;
	}

	@Get("redirect")
	@UseGuards(GithubGuard)
	@ApiOperation({
		summary: "Github OAuth 2.0 Callback URL",
		description: "Used as a redirection of the Github OAuth 2.0 provider a user",
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
	async githubRedirect(@Res() res: Response) {
		return this.service.redirect(res);
	}
}
