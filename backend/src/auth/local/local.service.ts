import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { AuthenticatedUser } from "../entities/authenticated-user.entity";
import { OnlineStatusService } from "src/online-status/online-status.service";

@Injectable()
export class LocalService {
	constructor(
		private readonly userService: UserService,
		private readonly onlineStatusService: OnlineStatusService
	) {}

	async validate(username: string, pass: string): Promise<AuthenticatedUser> {
		const user = await this.userService.findOne(username);

		const { password, twoFactorAuthenticationSecret, ...result } = user!;

		if (!password) throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);

		const comparison = await bcrypt.compare(pass, password);

		if (!comparison) throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);

		const status = this.onlineStatusService.onlineStatus(username);

		if (status && status !== "Offline") {
			throw new HttpException(`Already logged in!`, HttpStatus.AMBIGUOUS);
		}

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
