import { GameData } from "../types/game/game-data";

export interface GameComponents {
	gameState: any;
	lastScored: number; //1 for left paddle 2 for right paddle

	//paddles variables
	paddleLeft: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	paddleRight: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

	paddleHeight: number;

	leftScoreLabel: Phaser.GameObjects.Text;
	rightScoreLabel: Phaser.GameObjects.Text;

	//ball variables
	ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

	//cursos variables
	cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

	//power up
	powerUp: boolean;

	isLeft: boolean;

	data: GameData;

	movement: boolean;

	maxScore: number;
}
