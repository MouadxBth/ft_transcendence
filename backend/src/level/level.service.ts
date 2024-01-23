import { Injectable } from "@nestjs/common";
import { AuthenticatedUser } from "src/auth/entities/authenticated-user.entity";
import { UserService } from "src/user/user.service";
import { type Request } from "express";
import { ConfigService } from "@nestjs/config";

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

	async grantExperience(req: Request, experience: number) {
		const user = (req.user! as AuthenticatedUser).user;

		let newLevel = user.level + 1;
		let newExp = user.experience + experience;

		while (this.calculateRequiredExperience(newExp, newLevel) >= 0) {
			newExp = this.calculateRequiredExperience(newExp, newLevel);
			newLevel++;
		}
		const updatedLevel = newExp === user.experience + experience ? user.level : newLevel;
		await this.userService.update(req, user.username, { level: updatedLevel, experience: newExp });
		return { updatedLevel, newExp };
	}

	async getRequiredExperience(target: string) {
		const user = await this.userService.findOne(target);

		return Math.abs(this.calculateRequiredExperience(user.experience, user.level + 1));
	}
}
