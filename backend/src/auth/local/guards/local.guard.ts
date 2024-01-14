import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class LocalGuard extends AuthGuard("local") implements CanActivate {
	override async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest<Request>();

		if (request.isAuthenticated()) {
			throw new HttpException("Already logged in!", HttpStatus.BAD_REQUEST);
		}

		const result = (await super.canActivate(context)) as boolean;

		if (result) await super.logIn(request);

		return result;
	}
}
