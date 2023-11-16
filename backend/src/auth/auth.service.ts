import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import type { Request, Response } from "express";

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	invalidateSession(request: Request, response: Response) {
		if (!request.isAuthenticated()) {
			throw new HttpException("You are not logged in!", HttpStatus.BAD_REQUEST);
		}

		const sessionName = this.configService.get<string>("SESSION_NAME") || "connect.sid";

		response.clearCookie(sessionName);

		request.logOut({ keepSessionInfo: false }, (logOutError: unknown) => {
			if (logOutError)
				throw new HttpException("Failed to log out", HttpStatus.INTERNAL_SERVER_ERROR);

			request.session.destroy((sessionError: unknown) => {
				if (sessionError)
					throw new HttpException("Failed to destroy session", HttpStatus.INTERNAL_SERVER_ERROR);
			});
		});

		return "Logged out";
	}
}
