import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleGuard extends AuthGuard("google") implements CanActivate {
	override async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		let result = false;
		if (request.isAuthenticated()) {
			throw new HttpException("Already logged in!", HttpStatus.BAD_REQUEST);
		}
		try {
			result = (await super.canActivate(context)) as boolean;
		} catch (error: unknown) {
			return false;
		}
		await super.logIn(request);
		return result;
	}
}
