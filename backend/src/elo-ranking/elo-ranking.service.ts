import { Injectable } from "@nestjs/common";
import { MatchHistoryService } from "src/match-history/match-history.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class EloRankingService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly matchHistoryService: MatchHistoryService
	) {}

	async leaderboard() {
		return await this.prismaService.user.findMany({
			orderBy: [
				{
					eloRating: "desc",
				},
			],
			take: 10,
			select: {
				username: true,
				nickname: true,
				eloRating: true,
			},
		});
	}

	async getEloRating(username: string) {
		const user = await this.userService.findOne(username);

		const rank = await this.prismaService.user.count({
			where: { eloRating: { gt: user.eloRating } },
		});

		return { user, rank: rank + 1 };
	}

	async updateElo(matchId: number) {
		const matchHistory = await this.matchHistoryService.findOneInclusive(matchId);

		const member1 = matchHistory.members[0];
		const member2 = matchHistory.members[1];

		const result = this.eloRating(
			{
				rating: member1!.user.eloRating,
				winner: member1!.winner,
			},
			{
				rating: member2!.user.eloRating,
				winner: member2!.winner,
			},
			member1!.draw ? true : member2!.draw
		);

		return await Promise.all([
			this.userService.updateTarget(member1!.userId, { eloRating: result.r1 }),
			this.userService.updateTarget(member2!.userId, { eloRating: result.r2 }),
		]);
	}

	//used for the elo rating caluctions
	private expectedOutcome(rating1: number, rating2: number) {
		return (1.0 * 1.0) / (1 + 1.0 * Math.pow(10, (1.0 * (rating1 - rating2)) / 400));
	}

	private eloGain(rating: number, expected: number, k: number, status: number) {
		return Math.round(rating + k * (status - expected));
	}

	private eloRating(
		r1: { rating: number; winner: boolean },
		r2: { rating: number; winner: boolean },
		draw: boolean
	) {
		return {
			r1: this.eloGain(
				r1.rating,
				this.expectedOutcome(r2.rating, r1.rating),
				30,
				draw ? 0.5 : r1.winner ? 1 : 0
			),
			r2: this.eloGain(
				r2.rating,
				this.expectedOutcome(r1.rating, r2.rating),
				30,
				draw ? 0.5 : r2.winner ? 1 : 0
			),
		};
	}
}
