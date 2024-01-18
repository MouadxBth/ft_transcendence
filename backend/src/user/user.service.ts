import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from "express";
import { User } from "@prisma/client";
import { UserCache } from "./user.cache";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly userCache: UserCache
	) {}

	async create(dto: CreateUserDto) {
		const usernameResult = await this.prisma.user.findUnique({ where: { username: dto.username } });

		if (usernameResult) throw new HttpException("Username already taken!", HttpStatus.BAD_REQUEST);

		return await this.prisma.user.create({
			data: dto,
		});
	}

	async findAll() {
		return this.prisma.user.findMany();
	}

	async search(nickname: string) {
		return this.prisma.user.findMany({
			where: {
				nickname: {
					contains: nickname,
				},
			},
		});
	}

	async findOne(username: string) {
		let result: User | null | undefined = await this.userCache.getAndUpdate(username);

		if (!result) {
			result = await this.prisma.user.findUnique({
				where: {
					username: username,
				},
			});

			if (!result)
				throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);

			if (result) await this.userCache.set(result);
		}

		return result;
	}

	async updateTarget(usernameValue: string, updateUserDto: UpdateUserDto) {
		const user = await this.prisma.user.findUnique({
			where: { username: usernameValue },
		});

		if (!user)
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);

		if (updateUserDto.username && usernameValue !== updateUserDto.username) {
			const check = await this.prisma.user.findUnique({
				where: { username: updateUserDto.username },
			});

			if (check)
				throw new HttpException("User with that username already exists!", HttpStatus.BAD_REQUEST);
		}

		if (updateUserDto.nickname) {
			const check = await this.prisma.user.findFirst({
				where: { nickname: updateUserDto.nickname },
			});

			if (check)
				throw new HttpException("User with that nickname already exists!", HttpStatus.BAD_REQUEST);
		}

		if (updateUserDto.password)
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

		return await this.prisma.$transaction(async (client) => {
			const updatedUser = await client.user.update({
				where: { username: usernameValue },
				data: updateUserDto,
			});

			if (!updatedUser)
				throw new HttpException("Unable to update user!", HttpStatus.INTERNAL_SERVER_ERROR);

			await this.userCache.update(usernameValue, updatedUser);

			const { password, twoFactorAuthenticationSecret, ...result } = updatedUser;

			return result;
		});
	}

	async update(req: Request, usernameValue: string, updateUserDto: UpdateUserDto) {
		const authenticatedUser = req.user as AuthenticatedUser;

		if (authenticatedUser && authenticatedUser.user.username !== usernameValue)
			throw new HttpException(
				"You are not allowed to perform this operation!",
				HttpStatus.FORBIDDEN
			);

		const user = await this.prisma.user.findUnique({
			where: { username: usernameValue },
		});

		if (!user)
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);

		if (updateUserDto.username && usernameValue !== updateUserDto.username) {
			const check = await this.prisma.user.findUnique({
				where: { username: updateUserDto.username },
			});

			if (check)
				throw new HttpException("User with that username already exists!", HttpStatus.BAD_REQUEST);
		}

		if (updateUserDto.nickname) {
			const check = await this.prisma.user.findFirst({
				where: { nickname: updateUserDto.nickname },
			});

			if (check)
				throw new HttpException("User with that nickname already exists!", HttpStatus.BAD_REQUEST);
		}

		if (updateUserDto.password)
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

		return await this.prisma.$transaction(async (client) => {
			const updatedUser = await client.user.update({
				where: { username: usernameValue },
				data: updateUserDto,
			});

			if (!updatedUser)
				throw new HttpException("Unable to update user!", HttpStatus.INTERNAL_SERVER_ERROR);

			await this.userCache.update(usernameValue, updatedUser);

			const { password, twoFactorAuthenticationSecret, ...result } = updatedUser;

			req.logIn(
				{ user: result, valid2Fa: authenticatedUser.valid2Fa } as AuthenticatedUser,
				{ session: true },
				(error: unknown) => {
					if (error && error instanceof Error)
						throw new HttpException(
							`Unable to update user session! ${error.message}`,
							HttpStatus.INTERNAL_SERVER_ERROR
						);
				}
			);

			return result;
		});
	}

	async remove(req: Request, username: string) {
		const authenticatedUser = req.user as AuthenticatedUser;

		if (authenticatedUser && authenticatedUser.user.username !== username)
			throw new HttpException(
				"You are not allowed to perform this operation!",
				HttpStatus.FORBIDDEN
			);

		const usernameResult = await this.prisma.user.findUnique({ where: { username: username } });

		if (!usernameResult)
			throw new HttpException("User with that username doesnt exist!", HttpStatus.NOT_FOUND);

		return await this.prisma.$transaction(async (client) => {
			const removedUser = await client.user.delete({
				where: { username },
			});

			if (!removedUser)
				throw new HttpException("Unable to delete user!", HttpStatus.INTERNAL_SERVER_ERROR);

			await this.userCache.delete(username);

			req.logOut({ keepSessionInfo: false }, (error: unknown) => {
				if (error && error instanceof Error)
					throw new HttpException(
						`Unable to delete user session! ${error.message}`,
						HttpStatus.INTERNAL_SERVER_ERROR
					);
			});

			const { password, twoFactorAuthenticationSecret, ...result } = removedUser;

			return result;
		});
	}
}
