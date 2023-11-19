import { Injectable, NestMiddleware } from "@nestjs/common";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TwoFactorMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const user = req.user as User;

		if (!user || !user.twoFactorAuthenticationEnabled) {
			return next();
		}

		const check = (req.session as any).validTwoFa;

		if (!check) {
			return res.redirect("/api/v1/auth/2fa");
		}
		next();
	}
}
