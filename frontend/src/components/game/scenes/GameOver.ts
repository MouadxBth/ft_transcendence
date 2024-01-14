import Phaser from 'phaser'

import { TitleSceneKey } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/FontKeys'

export default class GameOver extends Phaser.Scene
{
	create(data : any)
	{
		let titleText = 'Game Over'
		if (data.leftScore > data.rightScore)
		{
			// player won
			titleText = 'You Win!'
		}
		
		this.add.text(400, 200, titleText, {
			fontFamily: PressStart2P,
			fontSize: 38
		})
		.setOrigin(0.5)

		this.add.text(400, 300, 'Press Space to Continue', {
			fontFamily: PressStart2P
		})
		.setOrigin(0.5)

		this.input.keyboard?.once('keydown-SPACE', () => {
			this.scene.start(TitleSceneKey)
		})
	}
}
