import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { GamePlayer } from "src/game/entities/game-player.entity";

@Injectable()
export class LevelService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
	) {}

	calculateGainedExperience(points: number, win: boolean, ranked: boolean) {
		const k = this.configService.get<number>("GAINED_EXPERIENCE_CONSTANT")!;
		const pk = this.configService.get<number>("GAINED_POINTS_CONSTANT")!;
		const result = win ? 2 * k : k;

		const bonus = ranked ? pk * points : 0;

		return bonus > 0 ? result + bonus : result;
	}

	calculateLevelExperience(level: number) {
		const k = this.configService.get<number>("LEVEL_EXPERIENCE_CONSTANT")!;
		return k * level;
	}

	calculateRequiredExperience(experience: number, level: number) {
		return experience - this.calculateLevelExperience(level);
	}

	async grantExperience(player: GamePlayer) {
		const experience = player.score * 100 + 1000 + (player.winner ? 500 : 0);

		console.log("EXP: ", player.user.experience, experience);

		let newLevel = player.user.level;
		let newExp = player.user.experience + experience;

		while (this.calculateRequiredExperience(newExp, newLevel) >= 0) {
			newExp = this.calculateRequiredExperience(newExp, newLevel);
			newLevel++;
		}
		const updatedLevel =
			newExp === player.user.experience + experience ? player.user.level : newLevel;

		await this.userService.updateTarget(player.user.username, {
			level: updatedLevel,
			experience: newExp,
		});

		const result = { updatedLevel, newExp, leveledUp: updatedLevel > player.user.level };

		console.log("Giving: ", player.user.username, result);

		return result;
	}

	async getRequiredExperience(target: string) {
		const user = await this.userService.findOne(target);

		return {
			level: user.level,
			experience: user.experience,
			required: Math.abs(this.calculateRequiredExperience(user.experience, user.level + 1)),
		};
	}
}
