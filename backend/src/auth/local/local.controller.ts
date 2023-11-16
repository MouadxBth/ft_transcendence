import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { type Request } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LocalService } from "./local.service";

@Controller("auth/local")
export class LocalController {
	constructor(private readonly localService: LocalService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	async localLogin(@Req() req: Request) {
		return req.user;
	}

	@Post("register")
	async register(@Body() dto: CreateUserDto) {
		return this.localService.register(dto);
	}
}
