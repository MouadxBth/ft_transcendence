import { Controller, Get, HttpStatus, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

import type { Request, Response } from "express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("profile")
	@UseGuards(AuthenticatedGuard)
	@ApiOperation({
		summary: "Fetches the profile of the currently authenticated User (FOR TESTING PURPOSES)",
		description:
			"Used to fetch the profile of the currently authenticated User (FOR TESTING PURPOSES)",
	})
	@ApiResponse({ type: User, status: HttpStatus.OK, description: "Authenticated User's profile" })
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "If the user is not authenticated, a Forbidden exception will be returned",
	})
	profile(@Req() req: Request) {
		return req.user;
	}

	@Get("logout")
	@ApiOperation({
		summary: "Log out the current authenticated User",
		description: "Used to Log out the current authenticated User",
	})
	@ApiResponse({
		type: String,
		status: HttpStatus.CREATED,
		description: "If logged out successfully, Logged Out will be returned",
	})
	@ApiResponse({
		status: HttpStatus.FORBIDDEN,
		description: "If the user is not authenticated, a Forbidden exception will be returned",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description:
			"If it failed to log out the current authenticated user, an Internal Server error will be returned",
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description:
			"If it failed to destroy the current authenticated user's session, an Internal Server error will be returned",
	})
	logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): any {
		return this.authService.logout(request, response);
	}
}
