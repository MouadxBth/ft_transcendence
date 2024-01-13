const PressStart2P = '"Press Start 2P"';

export class BlankScene extends Phaser.Scene {
	preload() {}

	async create() {
		await new Promise((resolve) => {
			setTimeout(resolve, 1000 * 2);
		});

		const title = this.add.text(400, 200, "Old School Tennis", {
			fontSize: 38,
			fontFamily: "Arial",
		});
		title.setOrigin(0.5, 0.5);
	}

	update() {}
}
