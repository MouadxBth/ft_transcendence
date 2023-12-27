import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class WsAuthenticatedGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const client = context.switchToWs().getClient();
		const request = client.request as Request;
		return request.isAuthenticated();
	}
}
