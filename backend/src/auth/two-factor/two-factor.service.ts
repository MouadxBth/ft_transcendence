import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { authenticator } from "otplib";
import { UserService } from "src/user/user.service";
import { toDataURL } from "qrcode";
import { Request } from "express";

@Injectable()
export class TwoFactorService {
	constructor(private readonly userService: UserService) {}

	async enableTwoFactorAuth(user: User) {
		if (user.twoFactorAuthenticationEnabled && user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is already enabled!", HttpStatus.BAD_REQUEST);

		const secret = authenticator.generateSecret();

		const otpAuthUrl = authenticator.keyuri(user.username, "ft_transcendence", secret);

		await this.userService.update(user.username, {
			twoFactorAuthenticationEnabled: true,
			twoFactorAuthenticationSecret: secret,
		});

		return {
			message: "Log out and log in for 2FA to take effect!",
			data: await toDataURL(otpAuthUrl),
		};
	}

	async disableTwoFactorAuth(user: User) {
		if (!user.twoFactorAuthenticationEnabled || !user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is already disabled!", HttpStatus.BAD_REQUEST);

		await this.userService.update(user.username, {
			twoFactorAuthenticationEnabled: false,
			twoFactorAuthenticationSecret: undefined,
		});

		return "2FA disabled!";
	}

	async isTwoFactorAuthenticationCodeValid(
		req: Request,
		twoFactorAuthenticationCode: string,
		sender: User
	) {
		if ((req.session as any).validTwoFa)
			throw new HttpException("2FA Code is already validated!", HttpStatus.BAD_REQUEST);

		const user = await this.userService.findOne(sender.username);

		if (!user.twoFactorAuthenticationEnabled || !user.twoFactorAuthenticationSecret) return false;

		const check = authenticator.verify({
			token: twoFactorAuthenticationCode,
			secret: user.twoFactorAuthenticationSecret,
		});

		(req.session as any).validTwoFa = check;

		if (!check) throw new HttpException("2FA Code is invalid!", HttpStatus.UNAUTHORIZED);

		return "2FA Code validated Successfully!";
	}
}
