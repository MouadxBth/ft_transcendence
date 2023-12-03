import { Injectable, ValidationPipe } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { ValidationError } from "class-validator";

@Injectable()
export class WsValidationPipe extends ValidationPipe {
	constructor() {
		super({
			forbidNonWhitelisted: true,
			whitelist: true,
		});
	}
	override createExceptionFactory() {
		return (validationErrors: ValidationError[] = []) => {
			if (this.isDetailedOutputDisabled) {
				return new WsException("Validation failed!");
			}
			return new WsException(this.flattenValidationErrors(validationErrors));
		};
	}
}
