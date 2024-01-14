import { PressStart2P } from "../consts/FontKeys";
import { GameSceneKey } from "../consts/SceneKeys";
export class TitleScene extends Phaser.Scene {
	preload() {}

	create() {
		console.log("STARTED TITLE SCENE");
		this.add
			.text(400, 200, "Ping Pong", {
				fontSize: 38,
				fontFamily: PressStart2P,
			})
			.setOrigin(0.5, 0.5);

		this.add
			.text(400, 300, "Press Space to Start", {
				fontFamily: PressStart2P,
			})
			.setOrigin(0.5);

		this.input.keyboard?.once("keydown-SPACE", () => {
			this.scene.start(GameSceneKey);
		});
	}
}
