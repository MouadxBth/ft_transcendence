import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GithubGuard } from "./guards/github.guard";

@Controller("auth/github")
export class GithubController {
	@Get("login")
	@UseGuards(GithubGuard)
	async githubLogin(@Req() req: Request) {
		return req.user;
	}

	@Get("redirect")
	@UseGuards(GithubGuard)
	async githubRedirect(@Req() req: Request) {
		return req.user;
	}
}
