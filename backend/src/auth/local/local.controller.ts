import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LocalGuard } from "./guards/local.guard";
import { type Request } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LocalService } from "./local.service";
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

@ApiTags("Auth | Local")
@Controller("auth/local")
export class LocalController {
	constructor(private readonly localService: LocalService) {}

	@Post("login")
	@UseGuards(LocalGuard)
	@ApiOperation({
		summary: "Login/Authenticate a user",
		description: "Used to Login/Authenticate a user",
	})
	@ApiResponse({ type: User, status: 201, description: "Authenticated User's profile" })
	@ApiResponse({
		status: 401,
		description: "If the user's credentials don't match, a Unauthorized exception will be returned",
	})
	async localLogin(@Req() req: Request) {
		return req.user;
	}

	@Post("register")
	@ApiOperation({
		summary: "Register a new user",
		description: "Used to Register a new user",
	})
	@ApiBody({ type: CreateUserDto, description: "D.T.O for registering a new User" })
	@ApiResponse({ type: User, status: 201, description: "User registered successfully" })
	@ApiResponse({
		status: 400,
		description: "If the user already exists, a Bad request will be returned",
	})
	async register(@Body() dto: CreateUserDto) {
		return this.localService.register(dto);
	}
}
