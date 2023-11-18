import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
	serializeUser(user: any, done: (err: any, user: any) => void): any {
		done(null, user);
	}
	deserializeUser(payload: any, done: (err: any, payload: string) => void): any {
		done(null, payload);
	}
}
