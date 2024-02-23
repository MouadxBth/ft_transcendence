import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { type Request } from "express";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";

@Catch(Error)
export class WsExceptionFilter extends BaseWsExceptionFilter {
	override catch(exception: Error, host: ArgumentsHost) {
		const context = host.switchToWs();
		const client = context.getClient<Socket>();
		const data = context.getData();
		const authenticatedUser = (client.request as Request).user! as AuthenticatedUser;

		let errorResponse: any;

		if (exception instanceof HttpException) {
			errorResponse = {
				authenticatedUser,
				error: exception.name,
				status: exception.getStatus(),
				message: exception.message,
				cause: exception.cause,
				data: data,
			};
		} else if (exception instanceof WsException) {
			errorResponse = {
				authenticatedUser,
				error: exception.name,
				message: exception.getError(),
				cause: exception.cause,
				data: data,
			};
		} else {
			console.error(exception);
			errorResponse = {
				authenticatedUser,
				error: "Internal Server Error",
				message: "Something bad happened!",
				cause: exception.message,
				data: data,
			};
		}

		client.emit("error", errorResponse);
	}
}
