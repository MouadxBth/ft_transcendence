import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { TwoFactorService } from "./two-factor.service";
import { AuthenticatedGuard } from "../guards/authenticated.guard";
import { type Request } from "express";
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from "@nestjs/swagger";
import { TimeBasedOneTimePasswordDto } from "./dto/totp.dto";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";

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
	@ApiResponse({ status: HttpStatus.OK, description: "Two-Factor Authentication instructions" })
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
		status: HttpStatus.OK,
		description: "Validation result of the Two-Factor Authentication code",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Two-Factor Authentication code not enabled",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Two-Factor Authentication code already verified",
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: "Two-Factor Authentication code invalid",
	})
	async verifyTwoFactorAuthentication(
		@Req() req: Request,
		@Body() code: TimeBasedOneTimePasswordDto
	) {
		return this.twoFactorService.isTwoFactorAuthenticationCodeValid(
			req,
			code.totp,
			req.user as AuthenticatedUser
		);
	}

	@Post("enable")
	@ApiOperation({
		summary: "Enable Two-Factor Authentication",
		description: "Used to enable Two-Factor Authentication for the authenticated user",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Two-Factor Authentication enabled successfully",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Two-Factor Authentication already enabled",
	})
	async enableTwoFactorAuthentication(@Req() req: Request) {
		return this.twoFactorService.enableTwoFactorAuth(req);
	}

	@Post("disable")
	@ApiOperation({
		summary: "Disable Two-Factor Authentication",
		description: "Used to disable Two-Factor Authentication for the authenticated user",
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Two-Factor Authentication disabled successfully",
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: "Two-Factor Authentication already disabled",
	})
	async disableTwoFactorAuthentication(@Req() req: Request) {
		return this.twoFactorService.disableTwoFactorAuth(req);
	}

	@Get("qrcode")
	@ApiOperation({
		summary: "Fetch Qr Code",
		description: "Used to fetch your personal Qr Code",
	})
	@ApiResponse({ status: HttpStatus.OK, description: "Qr Code" })
	@ApiResponse({ status: 400, description: "2FA is not enabled" })
	async getQrCode(@Req() req: Request) {
		return this.twoFactorService.getQrCode(req);
	}
}
