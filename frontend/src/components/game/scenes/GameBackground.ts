import * as Colors from "../consts/Colors";

export class GameBackground extends Phaser.Scene {
	preload() {}

	create() {
		this.add.line(400, 300, 0, 0, 0, 800, Colors.White, 1).setLineWidth(2.5, 2.5);

		this.add.circle(400, 300, 50).setStrokeStyle(5, Colors.White, 1);
	}
}
