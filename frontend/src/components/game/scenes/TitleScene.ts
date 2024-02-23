import { PressStart2P } from "../consts/FontKeys";
import { GameOverSceneKey, GameSceneKey } from "../consts/SceneKeys";
import { GameMatchType } from "@/lib/types/game/game-match";
import { GameData } from "@/lib/types/game/game-data";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
export class TitleScene extends Phaser.Scene {
	preload() {}

	private addText(text: string, size: number, verticalOffset: boolean) {
		const midHeight = this.cameras.main.height / 2;
		const midWidth = this.cameras.main.width / 2;
		const offset = Math.round(0.1 * midHeight);

		return this.add.text(midWidth, midHeight + (verticalOffset ? offset : -offset), text, {
			fontSize: size,
			fontFamily: PressStart2P,
		});
	}

	create(data: GameData) {
		const { context, authenticatedUser, match } = data;
		if (authenticatedUser === null) return;

		context.game?.on("start_game", (args: GameMatchType) => {
			this.scene.start(GameSceneKey, { context, authenticatedUser, match } satisfies GameData);
		});

		this.handleEndGame(data);

		this.addText("Loading", 38, false).setOrigin(0.5, 0.5);
		this.addText("Waiting for your opponent to be ready...", 19, true).setOrigin(0.5, 0.5);

		context.game?.emit("ready_player");
	}

	handleEndGame({ context, authenticatedUser }: GameData) {
		context.game?.on(
			"end_game",
			(winner: GameMatchPlayerType, loser: GameMatchPlayerType, game: GameMatchType) => {
				this.scene.start(GameOverSceneKey, {
					winner,
					loser,
					authenticatedUser,
					game,
				});
			}
		);
	}
}
