import { TitleSceneKey } from "../consts/SceneKeys";
import { PressStart2P } from "../consts/FontKeys";

export class GameOver extends Phaser.Scene {
	create(data: any) {
		const titleText = data.leftScore > data.rightScore ? "You Win" : "Game Over";

		this.add
			.text(400, 200, titleText, {
				fontFamily: PressStart2P,
				fontSize: 38,
			})
			.setOrigin(0.5);

		this.add
			.text(400, 300, "Press Space to Continue", {
				fontFamily: PressStart2P,
			})
			.setOrigin(0.5);

		this.input.keyboard?.once("keydown-SPACE", () => {
			this.scene.start(TitleSceneKey);
		});
	}
}
