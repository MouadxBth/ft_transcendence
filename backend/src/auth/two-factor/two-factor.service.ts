import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { authenticator } from "otplib";
import { UserService } from "src/user/user.service";
import { toDataURL } from "qrcode";
import { type Request } from "express";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";

@Injectable()
export class TwoFactorService {
	constructor(private readonly userService: UserService) {}

	async enableTwoFactorAuth(req: Request) {
		const user = await this.userService.findOne((req.user! as AuthenticatedUser).user.username);

		if (user.twoFactorAuthenticationEnabled && user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is already enabled!", HttpStatus.BAD_REQUEST);

		const secret = authenticator.generateSecret();

		await this.userService.update(req, user.username, {
			twoFactorAuthenticationEnabled: true,
			twoFactorAuthenticationSecret: secret,
		});

		return req.user;
	}

	async disableTwoFactorAuth(req: Request) {
		const user = await this.userService.findOne((req.user! as AuthenticatedUser).user.username);

		if (!user.twoFactorAuthenticationEnabled || !user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is already disabled!", HttpStatus.BAD_REQUEST);

		await this.userService.update(req, user.username, {
			twoFactorAuthenticationEnabled: false,
			twoFactorAuthenticationSecret: undefined,
		});

		return req.user;
	}

	async isTwoFactorAuthenticationCodeValid(
		req: Request,
		twoFactorAuthenticationCode: string,
		sender: AuthenticatedUser
	) {
		if (sender.valid2Fa)
			throw new HttpException("2FA Code is already validated!", HttpStatus.BAD_REQUEST);

		const user = await this.userService.findOne(sender.user.username);

		if (!user.twoFactorAuthenticationEnabled || !user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is not enabled!", HttpStatus.BAD_REQUEST);

		sender.valid2Fa = authenticator.verify({
			token: twoFactorAuthenticationCode,
			secret: user.twoFactorAuthenticationSecret,
		});

		if (!sender.valid2Fa) throw new HttpException("2FA Code is invalid!", HttpStatus.UNAUTHORIZED);

		req.logIn(sender, { session: true }, (error: unknown) => {
			if (error && error instanceof Error)
				throw new HttpException(
					`Unable to update user session! ${error.message}`,
					HttpStatus.INTERNAL_SERVER_ERROR
				);
		});

		if (user.twoFactorAuthenticationFirstTime) {
			await this.userService.update(req, user.username, {
				twoFactorAuthenticationFirstTime: false,
			});
		}

		return req.user;
	}

	async getQrCode(req: Request) {
		const user = await this.userService.findOne((req.user! as AuthenticatedUser).user.username);

		if (!user.twoFactorAuthenticationEnabled || !user.twoFactorAuthenticationSecret)
			throw new HttpException("2FA is not disabled!", HttpStatus.BAD_REQUEST);

		const otpAuthUrl = authenticator.keyuri(
			user.username,
			"ft_transcendence",
			user.twoFactorAuthenticationSecret
		);

		return await toDataURL(otpAuthUrl);
	}
}
