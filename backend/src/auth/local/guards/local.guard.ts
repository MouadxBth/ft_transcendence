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

		let result;

		try {
			result = (await super.canActivate(context)) as boolean;
		} catch (error: unknown) {
			if (error instanceof HttpException && error.getStatus() === HttpStatus.AMBIGUOUS) {
				throw new HttpException("Already logged in!", HttpStatus.BAD_REQUEST);
			}
			return false;
		}

		if (result) await super.logIn(request);

		return result;
	}
}
