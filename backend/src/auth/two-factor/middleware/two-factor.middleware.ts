import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@Injectable()
export class TwoFactorMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const authenticatedUser = req.user as AuthenticatedUser;

		if (!authenticatedUser || !authenticatedUser.user.twoFactorAuthenticationEnabled) return next();

		if (
			req.path.endsWith("qrcode") &&
			req.method === "GET" &&
			authenticatedUser.user.twoFactorAuthenticationFirstTime
		)
			return next();

		if (!authenticatedUser.valid2Fa) return res.redirect("/api/v1/auth/2fa");

		next();
	}
}
