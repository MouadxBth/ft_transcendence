import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class LocalService {
	constructor(private readonly userService: UserService) {}

	async validate(username: string, pass: string) {
		const user = await this.userService.findOne(username);

		const { password, twoFactorAuthenticationSecret, ...result } = user;

		if (!password) throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);

		const comparison = await bcrypt.compare(pass, password);

		if (!comparison) {
			throw new HttpException("Invalid credentials!", HttpStatus.UNAUTHORIZED);
		}

		return result;
	}

	async register(dto: CreateUserDto) {
		if (!dto.password)
			throw new HttpException(
				"Invalid credentials, a password is required!",
				HttpStatus.BAD_REQUEST
			);
		const createUserDto = {
			...dto,
			password: await this.hash(dto.password, 10),
		} as CreateUserDto;
		return await this.userService.create(createUserDto);
	}

	async hash(password: string, rounds: number) {
		return bcrypt.hash(password, rounds);
	}
}
