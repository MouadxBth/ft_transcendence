import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TwoFactorService } from "./two-factor.service";
import { User } from "@prisma/client";
import { AuthenticatedGuard } from "../guards/authenticated.guard";
import { type Request } from "express";
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from "@nestjs/swagger";
import { TimeBasedOneTimePasswordDto } from "./dto/totp.dto";

@ApiTags("Auth | 2FA")
@Controller("auth/2fa")
@UseGuards(AuthenticatedGuard)
export class TwoFactorController {
	constructor(private readonly twoFactorService: TwoFactorService) {}

	@Get("/")
	@ApiOperation({
		summary: "Two-Factor Authentication",
		description: "Send a POST request with the TOTP to /api/v1/auth/2fa",
	})
	@ApiResponse({ status: 200, description: "Two-Factor Authentication instructions" })
	async twoFactorAuthentication() {
		return "Send a post request with the TOTP to /api/v1/auth/2fa";
	}

	@Post("/")
	@ApiOperation({
		summary: "Verify Two-Factor Authentication",
		description: "Used to verify the Two-Factor Authentication code",
	})
	@ApiBody({ type: String, description: "The Time-Based One-Time Password (TOTP)" })
	@ApiResponse({
		status: 200,
		description: "Validation result of the Two-Factor Authentication code",
	})
	async verifyTwoFactorAuthentication(
		@Req() req: Request,
		@Body() code: TimeBasedOneTimePasswordDto
	) {
		return this.twoFactorService.isTwoFactorAuthenticationCodeValid(
			req,
			code.totp,
			req.user as User
		);
	}

	@Post("enable")
	@ApiOperation({
		summary: "Enable Two-Factor Authentication",
		description: "Used to enable Two-Factor Authentication for the authenticated user",
	})
	@ApiResponse({ status: 200, description: "Two-Factor Authentication enabled successfully" })
	async enableTwoFactorAuthentication(@Req() req: Request) {
		return this.twoFactorService.enableTwoFactorAuth(req);
	}

	@Get("disable")
	@ApiOperation({
		summary: "Disable Two-Factor Authentication",
		description: "Used to disable Two-Factor Authentication for the authenticated user",
	})
	@ApiResponse({ status: 200, description: "Two-Factor Authentication disabled successfully" })
	async disableTwoFactorAuthentication(@Req() req: Request) {
		return this.twoFactorService.disableTwoFactorAuth(req);
	}
}
