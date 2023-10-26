import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto) {
		const usernameResult = await this.prisma.user.findUnique({ where: { username: dto.username } });

		if (usernameResult) {
			throw new HttpException("Username already taken!", HttpStatus.BAD_REQUEST);
		}

		const emailResult = await this.prisma.user.findUnique({ where: { email: dto.email } });

		if (emailResult) {
			throw new HttpException("Email is already in use!", HttpStatus.BAD_REQUEST);
		}

		const { password, ...otherInfo } = dto;
		const result: User = {
			...otherInfo,
			password: await this.hash(password, 10),
		};

		return this.prisma.user.create({
			data: result,
		});
	}

	async findAll(): Promise<User[]> {
		return this.prisma.user.findMany();
	}

	async findOne(username: string) {
		const result = await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!result) {
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);
		}
		return result;
	}

	async findOneByEmail(email: string) {
		const result = await this.prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!result) {
			throw new HttpException("User with that email doesnt exist!", HttpStatus.NOT_FOUND);
		}
		return result;
	}

	async update(usernameValue: string, updateUserDto: UpdateUserDto) {
		const user = await this.prisma.user.findUnique({
			where: { username: usernameValue },
		});

		if (!user) {
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);
		}

		const updatedUser = await this.prisma.user.update({
			where: { username: usernameValue },
			data: updateUserDto,
		});

		return updatedUser;
	}

	async remove(username: string) {
		const usernameResult = await this.findOne(username);

		if (!usernameResult) {
			throw new HttpException("Username doesnt exist!", HttpStatus.NOT_FOUND);
		}

		return this.prisma.user.delete({
			where: {
				username: username,
			},
		});
	}

	async hash(password: string, rounds: number) {
		return bcrypt.hash(password, rounds);
	}
}
