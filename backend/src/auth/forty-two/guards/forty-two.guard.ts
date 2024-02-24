import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FortyTwoGuard extends AuthGuard("42") implements CanActivate {
	override async canActivate(context: ExecutionContext) {
		let result = false;
		const request = context.switchToHttp().getRequest();
		if (request.isAuthenticated()) {
			throw new HttpException("Already logged in!", HttpStatus.BAD_REQUEST);
		}
		try {
			result = (await super.canActivate(context)) as boolean;
		} catch (error: unknown) {
			if (error instanceof HttpException && error.getStatus() === HttpStatus.AMBIGUOUS) {
				throw new HttpException("Already logged in!", HttpStatus.BAD_REQUEST);
			}
			return false;
		}
		await super.logIn(request);

		return result;
	}
}
