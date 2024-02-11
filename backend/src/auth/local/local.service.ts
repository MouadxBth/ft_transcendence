import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";

@Injectable()
export class LocalService {
	constructor(private readonly userService: UserService) {}

	async validate(username: string, pass: string): Promise<AuthenticatedUser> {
		const user = await this.userService.findOne(username);

		const { password, twoFactorAuthenticationSecret, ...result } = user!;

		if (!password) throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);

		const comparison = await bcrypt.compare(pass, password);

		if (!comparison) throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);

		return {
			user: result,
			valid2Fa: false,
		};
	}

	async register(req: Request, dto: CreateUserDto) {
		if (!dto.password)
			throw new HttpException(
				"Invalid credentials, a password is required!",
				HttpStatus.BAD_REQUEST
			);

		if (req.isAuthenticated())
			throw new HttpException("You are already logged in, log out first!", HttpStatus.BAD_REQUEST);

		const createUserDto = {
			...dto,
			password: await this.hash(dto.password, 10),
			avatar: dto.avatar ?? encodeURI(`https://robohash.org/${dto.firstName} ${dto.lastName}`),
		} as CreateUserDto;

		const { twoFactorAuthenticationSecret, password, ...result } =
			await this.userService.create(createUserDto);
		return result;
	}

	async hash(password: string, rounds: number) {
		return bcrypt.hash(password, rounds);
	}
}
