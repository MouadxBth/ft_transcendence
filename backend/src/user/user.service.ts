import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(dto: CreateUserDto) {
		const usernameResult = await this.prisma.user.findUnique({ where: { username: dto.username } });

		if (usernameResult) {
			throw new HttpException("Username already taken!", HttpStatus.BAD_REQUEST);
		}
		return this.prisma.user.create({
			data: dto,
		});
	}

	async findAll() {
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

	async update(usernameValue: string, updateUserDto: UpdateUserDto) {
		const user = await this.prisma.user.findUnique({
			where: { username: usernameValue },
		});

		if (!user) {
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);
		}

		if (usernameValue !== updateUserDto.username) {
			const check = await this.prisma.user.findUnique({
				where: { username: updateUserDto.username },
			});

			if (check) {
				throw new HttpException("User with that username already exists!", HttpStatus.BAD_REQUEST);
			}
		}

		const updatedUser = await this.prisma.user.update({
			where: { username: usernameValue },
			data: updateUserDto,
		});

		return updatedUser;
	}

	async remove(username: string) {
		const usernameResult = await this.prisma.user.findUnique({ where: { username: username } });

		if (!usernameResult) {
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);
		}

		return this.prisma.user.delete({
			where: {
				username: username,
			},
		});
	}
}
