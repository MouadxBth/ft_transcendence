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
	) {
		const seed: CreateAchievementDto[] = [
			{
				name: "Transcend",
				brief: "Join the adventure, transcendence!",
				description: "You have made it! you have transcended! Welcome",
			},

			{
				name: "LevelUP",
				brief: "Yay! Levels",
				description: "You did it! you leveld up to level 2! Keep up :)",
			},
		];

		Promise.all(seed.map((achievement) => this.create(achievement)));
	}

	async create(dto: CreateAchievementDto) {
		const result = await this.prismaService.achievement.findUnique({
			where: {
				name: dto.name,
			},
		});

		if (result) return result;

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
		return await this.prismaService.userAchievement
			.findMany({
				where: {
					userId: target,
				},
				select: {
					unlockedAt: true,
					achievement: true,
					userId: false,
					achievementId: false,
				},
			})
			.then((collection) =>
				collection.map(({ achievement, unlockedAt }) => ({ ...achievement, unlockedAt }))
			);
	}

	async awardAchievement(name: string, username: string, quiet: boolean) {
		const user = await this.userService.findOne(username);
		const achievement = await this.prismaService.achievement.findUnique({
			where: {
				name,
			},
		});

		if (!achievement) {
			if (!quiet) throw new HttpException("Achievement does not exist!", HttpStatus.NOT_FOUND);
			return;
		}

		const userAchievement = await this.prismaService.userAchievement.findUnique({
			where: {
				userId_achievementId: {
					userId: user.username,
					achievementId: achievement.name,
				},
			},
		});

		if (userAchievement) {
			if (!quiet)
				throw new HttpException(
					`User already has the achievement ${name}.`,
					HttpStatus.BAD_REQUEST
				);
			return;
		}

		const createResult = await this.prismaService.userAchievement.create({
			data: {
				userId: user.username,
				achievementId: achievement.name,
				unlockedAt: new Date(),
			},
			select: {
				unlockedAt: true,
				user: {
					select: {
						username: true,
						nickname: true,
						avatar: true,
						achievements: {
							select: {
								achievement: true,
								unlockedAt: true,
							},
						},
					},
				},
			},
		});

		const result = {
			username: createResult.user.username,
			nickname: createResult.user.nickname,
			avatar: createResult.user.avatar,
			latest: {
				...achievement,
				unlockedAt: createResult.unlockedAt,
			},
			achievements: createResult.user.achievements.map(({ unlockedAt, achievement }) => ({
				unlockedAt,
				...achievement,
			})),
		};
		return result;
	}
}
