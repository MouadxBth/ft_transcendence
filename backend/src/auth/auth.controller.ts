import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthenticatedGuard } from "./guards/authenticated.guard";

import type { Request, Response } from "express";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get("profile")
	@UseGuards(AuthenticatedGuard)
	profile(@Req() req: Request) {
		return req.user;
	}

	@Post("logout")
	logout(@Req() request: Request, @Res({ passthrough: true }) response: Response): any {
		return this.authService.invalidateSession(request, response);
	}
}
