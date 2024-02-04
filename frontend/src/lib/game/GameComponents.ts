export interface GameComponents {
	gameState: any;
	lastScored: number; //1 for left paddle 2 for right paddle
	p1Score: number;
	p2Score: number;

	//paddles variables
	paddleLeft: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	paddleRight: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

	paddleHeight: number;

	//score variables
	leftScore: number;
	rightScore: number;

	leftScoreLabel: Phaser.GameObjects.Text;
	rightScoreLabel: Phaser.GameObjects.Text;

	//ball variables
	ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

	//cursos variables
	cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

	//power up
	powerUp: boolean;

	//players object
	player : any;

	//socket var
	socket : any;
}
