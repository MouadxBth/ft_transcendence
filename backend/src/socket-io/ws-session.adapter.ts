import { INestApplication } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { ServerOptions, Server, Socket } from "socket.io";
import passport from "passport";
import { RequestHandler, type Request } from "express";
import { WsException } from "@nestjs/websockets";

export class WsSessionAdapter extends IoAdapter {
	constructor(
		private readonly session: RequestHandler,
		app: INestApplication
	) {
		super(app);
	}

	override create(port: number, options?: ServerOptions): Server {
		const server: Server = super.create(port, options);

		const wrap = (middleware: any) => (socket: any, next: any) =>
			middleware(socket.request, {}, next);

		server.use(wrap(this.session));
		server.use(wrap(passport.initialize()));
		server.use(wrap(passport.session()));

		server.use((socket: Socket, next) => {
			if (!(socket.request as Request).isAuthenticated())
				next(new WsException("Not Authenticated!"));
			else next();
		});
		return server;
	}
}
