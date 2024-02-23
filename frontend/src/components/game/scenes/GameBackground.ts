import * as Colors from "../consts/Colors";

export class GameBackground extends Phaser.Scene {
	preload() {}

	create() {
		for (let index = 0; index < 30; index++) {
			if (index % 2 !== 0)
				this.add
					.line(this.cameras.main.width / 2, 0, 0, index * 30, 0, (index + 1) * 30, Colors.White, 1)
					.setLineWidth(6, 6);
		}
	}
}
