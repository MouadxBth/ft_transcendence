import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { MatchHistoryDto } from "./dto/match-history.dto";
import { MatchResultDto } from "./dto/match-result.dto";
import { MatchType } from "@prisma/client";

@Injectable()
export class MatchHistoryService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	async create(dto: MatchHistoryDto) {
		let matchType: MatchType = MatchType.CLASSIC;
		if (dto.map || dto.powerUp) matchType = MatchType.CUSTOM;

		return await this.prismaService.matchHistory.create({
			data: {
				...dto,
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

	async findAll(username: string) {
		return this.prismaService.matchHistory.findMany({
			where: {
				members: {
					some: {
						user: {
							username: username,
						},
					},
				},
			},
			include: {
				members: {
					select: {
						winner: true,
						draw: true,
						score: true,
						points: true,
						user: {
							select: {
								username: true,
							},
						},
					},
				},
			},
		});
	}

	async delete(id: number) {
		const matchHistory = await this.prismaService.matchHistory.findUnique({ where: { id: id } });

		if (!matchHistory)
			throw new HttpException("No such Match History was found !", HttpStatus.BAD_REQUEST);

		return await this.prismaService.matchHistory.delete({ where: { id: id } });
	}

	async recordResults(dto: MatchResultDto) {
		const player1 = await this.userService.findOne(dto.Player1.username);
		const player2 = await this.userService.findOne(dto.Player2.username);

		if (dto.Player1.matchId !== dto.Player2.matchId)
			throw new HttpException("Players don't share the same match id !!", HttpStatus.BAD_REQUEST);

		const matchHistory = await this.findOne(dto.Player1.matchId);

		let { matchId, username, ...player_result } = dto.Player1;
		await this.prismaService.matchResult.create({
			data: {
				...player_result,
				user: {
					connect: {
						username: player1.username,
					},
				},
				match: {
					connect: {
						id: matchHistory.id,
					},
				},
			},
		});

		({ matchId, username, ...player_result } = dto.Player2);
		await this.prismaService.matchResult.create({
			data: {
				...player_result,
				user: {
					connect: {
						username: player2.username,
					},
				},
				match: {
					connect: {
						id: matchHistory.id,
					},
				},
			},
		});
		return await this.findOne(matchHistory.id);
	}
}
