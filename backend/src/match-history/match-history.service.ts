import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { MatchHistoryDto } from "./dto/match-history.dto";
import { MatchResultDto } from "./dto/match-result.dto";
import { MatchType } from "@prisma/client";
import { GamePlayer } from "src/game/entities/game-player.entity";

@Injectable()
export class MatchHistoryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	async create(dto: MatchHistoryDto) {
		let matchType: MatchType = MatchType.CLASSIC;
		if (dto.super) matchType = MatchType.CUSTOM;

		return await this.prismaService.matchHistory.create({
			data: {
				type: matchType,
			},
		});
	}

	async findOne(id: number) {
		const matchHistory = await this.prismaService.matchHistory.findUnique({
			where: { id: id },
			include: { members: true },
		});

		if (!matchHistory)
			throw new HttpException("No such Match History was found !", HttpStatus.BAD_REQUEST);
		return matchHistory;
	}

	async findOneInclusive(id: number) {
		const matchHistory = await this.prismaService.matchHistory.findUnique({
			where: { id: id },
			include: {
				members: {
					include: {
						user: true,
					},
				},
			},
		});

		if (!matchHistory)
			throw new HttpException("No such Match History was found !", HttpStatus.BAD_REQUEST);
		return matchHistory;
	}

	async findAll(username: string) {
		const result = await this.prismaService.matchHistory.findMany({
			where: {
				members: {
					some: {
						user: {
							username: username,
						},
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
			select: {
				id: true,
				createdAt: true,
				type: true,
				members: {
					select: {
						winner: true,
						draw: true,
						score: true,
						user: {
							select: {
								username: true,
								nickname: true,
								avatar: true,
								firstName: true,
								lastName: true,
							},
						},
					},
				},
			},
		});

		return result.map((match) => {
			return {
				id: match.id,
				createdAt: match.createdAt,
				type: match.type,
				player1: match.members.find((member) => member.user.username === username)!,
				player2: match.members.find((member) => member.user.username !== username)!,
			};
		});
	}

	async delete(id: number) {
		const matchHistory = await this.prismaService.matchHistory.findUnique({ where: { id: id } });

		if (!matchHistory)
			throw new HttpException("No such Match History was found !", HttpStatus.BAD_REQUEST);

		return await this.prismaService.matchHistory.delete({ where: { id: id } });
	}

	private recordResult(id: number, { user, winner, draw, score }: GamePlayer) {
		return this.prismaService.matchResult.create({
			data: {
				winner,
				draw,
				score,

				user: { connect: { username: user.username } },
				match: { connect: { id } },
			},
		});
	}

	async recordResults({ matchId, player1, player2 }: MatchResultDto) {
		await this.userService.findOne(player1.user.username);
		await this.userService.findOne(player2.user.username);

		const matchHistory = await this.findOne(matchId);

		await Promise.all([this.recordResult(matchId, player1), this.recordResult(matchId, player2)]);

		return await this.findOne(matchHistory.id);
	}
}
