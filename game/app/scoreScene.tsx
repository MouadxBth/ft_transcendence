import Phaser from 'phaser'

export default class scoreScene extends Phaser.Scene{
    preload()
	{

	}

	create()
	{
		const title = this.add.text(400, 200, 'pong fucking game', {
			fontSize: 38,
			fontFamily: "press"
		})
		title.setOrigin(0.5, 0.5)

		const space = this.add.text(400, 300, 'Press Space to Start', {
			fontFamily: "press"
		})
		.setOrigin(0.5)
		this.input.keyboard!.once('keydown-SPACE', () => {
			space.setVisible(false);
			title.setVisible(false);
		})
	}
}