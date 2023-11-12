import { Injectable } from "@nestjs/common";
import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
@ValidatorConstraint({ name: "OwnerExistsRule", async: true })
export class OwnerExistsRule implements ValidatorConstraintInterface {
	constructor(private readonly prisma: PrismaService) {}

	async validate(ownerId: string | undefined) {
		if (!ownerId) return false;
		const owner = await this.prisma.user.findUnique({
			where: { username: ownerId },
		});

		if (!owner) return false;

		return true;
	}

	defaultMessage(_args: ValidationArguments) {
		return "Owner does not exist";
	}
}
