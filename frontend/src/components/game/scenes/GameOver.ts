import { TitleSceneKey } from "../consts/SceneKeys";
import { PressStart2P } from "../consts/FontKeys";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
import { AuthenticatedUser } from "@/lib/types/user/authenticated-user";

export interface GameOverProps {
	winner: GameMatchPlayerType;
	loser: GameMatchPlayerType;
	authenticatedUser: AuthenticatedUser;
}

export class GameOver extends Phaser.Scene {
	private addText(text: string, size: number, verticalOffset: boolean) {
		const midHeight = this.cameras.main.height / 2;
		const midWidth = this.cameras.main.width / 2;
		const offset = Math.round(0.1 * midHeight);

		return this.add.text(midWidth, midHeight + (verticalOffset ? offset : -offset), text, {
			fontSize: size,
			fontFamily: PressStart2P,
		});
	}

	create({ winner, loser, authenticatedUser }: GameOverProps) {
		const { user } = authenticatedUser;

		const titleText = user.username === winner.user.username ? "You Won!" : "You Lost!";
		const subtitleText =
			user.username === winner.user.username
				? `You have defeated "${loser.user.username}"!`
				: `You have been defeated by "${winner.user.username}"`;

		this.addText(titleText, 38, false).setOrigin(0.5, 0.5);
		this.addText(subtitleText, 19, true).setOrigin(0.5, 0.5);
	}
}
