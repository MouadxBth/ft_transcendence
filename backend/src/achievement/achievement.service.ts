import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAchievementDto } from "./dto/create-achievement.dto";
import { UpdateAchievementDto } from "./dto/update-achievement.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AchievementService {
	constructor(
		private prismaService: PrismaService,
		private userService: UserService
	) {}

	async create(dto: CreateAchievementDto) {
		const check = await this.prismaService.achievement.findUnique({
			where: {
				name: dto.name,
			},
		});

		if (check) throw new HttpException("Achievement already exists!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.achievement.create({
			data: dto,
		});
	}

	async update(nameValue: string, dto: UpdateAchievementDto) {
		const check = await this.prismaService.achievement.findUnique({
			where: {
				name: dto.name,
			},
		});

		if (!check) throw new HttpException("Achievement does not exist!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.achievement.update({
			where: {
				name: nameValue,
			},
			data: dto,
		});
	}

	async delete(nameValue: string) {
		const check = await this.prismaService.achievement.findUnique({
			where: {
				name: nameValue,
			},
		});

		if (!check) throw new HttpException("Achievement does not exist!", HttpStatus.BAD_REQUEST);

		return await this.prismaService.achievement.delete({
			where: {
				name: nameValue,
			},
		});
	}

	async findAll() {
		return await this.prismaService.achievement.findMany();
	}

	async findOf(target: string) {
		return await this.prismaService.userAchievement.findMany({
			where: {
				userId: target,
			},
			select: {
				unlockedAt: true,
				achievement: true,
				userId: false,
				achievementId: false,
			},
		});
	}

	async awardAchievement(name: string, username: string) {
		const user = await this.userService.findOne(username);
		const achievement = await this.prismaService.achievement.findUnique({
			where: {
				name,
			},
		});

		if (!achievement) throw new HttpException("Achievement does not exist!", HttpStatus.NOT_FOUND);

		const userAchievement = await this.prismaService.userAchievement.findUnique({
			where: {
				userId_achievementId: {
					userId: user.username,
					achievementId: achievement.name,
				},
			},
		});

		if (userAchievement) {
			throw new Error(`User already has the achievement ${name}.`);
		}

		return await this.prismaService.userAchievement.create({
			data: {
				userId: user.username,
				achievementId: achievement.name,
				unlockedAt: new Date(),
			},
		});
	}
}
