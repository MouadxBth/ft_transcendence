import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { MatchHistoryDto } from "./dto/match-history.dto";
import { MatchResultDto, Player, PlayerDto } from "./dto/match-result.dto";
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

	private recordResult(dto: PlayerDto) {
		const data: Player = dto;

		return this.prismaService.matchResult.create({
			data: {
				...data,
				user: {
					connect: {
						username: dto.username,
					},
				},
				match: {
					connect: {
						id: dto.matchId,
					},
				},
			},
		});
	}

	async recordResults(dto: MatchResultDto) {
		await this.userService.findOne(dto.Player1.username);
		await this.userService.findOne(dto.Player2.username);

		if (dto.Player1.matchId !== dto.Player2.matchId)
			throw new HttpException("Players don't share the same match id !!", HttpStatus.BAD_REQUEST);

		const matchHistory = await this.findOne(dto.Player1.matchId);

		await Promise.all([this.recordResult(dto.Player1), this.recordResult(dto.Player2)]);

		return await this.findOne(matchHistory.id);
	}
}
