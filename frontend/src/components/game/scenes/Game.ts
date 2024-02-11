import { GameBackgroundSceneKey, GameOverSceneKey } from "../consts/SceneKeys";
import * as Colors from "../consts/Colors";

import { PressStart2P } from "../consts/FontKeys";

const GameState = {
	Running: "running",
	PlayerWon: "player-won",
};
export class PongGame extends Phaser.Scene {
	gameState: any;

	//paddles variables
	paddleRightVelocity: any; //types should be modifed later
	paddleLeft: any;
	paddleRight: any;
	//score variables
	leftScore: any;
	rightScore: any;
	leftScoreLabel: any;
	rightScoreLabel: any;

	//ball variables
	ball: any;

	//cursos variables
	cursors: any;

	init() {
		this.gameState = GameState.Running;

		this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);

		this.leftScore = 0;
		this.rightScore = 0;
	}

	create() {
		this.scene.run(GameBackgroundSceneKey);
		this.scene.sendToBack(GameBackgroundSceneKey);

		this.physics.world.setBounds(-100, 0, 1000, 500);

		this.ball = this.add.circle(400, 250, 10, Colors.White, 1);
		this.physics.add.existing(this.ball);
		this.ball.body.setCircle(10);
		this.ball.body.setBounce(1, 1);
		this.ball.body.setMaxSpeed(400);

		this.ball.body.setCollideWorldBounds(true, 1, 1);
		this.ball.body.onWorldBounds = true;

		this.paddleLeft = this.add.rectangle(50, 250, 30, 100, Colors.White, 1);
		this.physics.add.existing(this.paddleLeft, true);

		this.paddleRight = this.add.rectangle(750, 250, 30, 100, Colors.White, 1);
		this.physics.add.existing(this.paddleRight, true);

		this.physics.add.collider(
			this.paddleLeft,
			this.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		);
		this.physics.add.collider(
			this.paddleRight,
			this.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		);

		const scoreStyle = {
			fontSize: 48,
			fontFamily: PressStart2P,
		};

		this.leftScoreLabel = this.add.text(300, 125, "0", scoreStyle).setOrigin(0.5, 0.5);

		this.rightScoreLabel = this.add.text(500, 375, "0", scoreStyle).setOrigin(0.5, 0.5);

		this.cursors = this.input.keyboard?.createCursorKeys();

		this.time.delayedCall(1500, () => {
			this.resetBall();
		});
	}

	update() {
		if (this.gameState !== GameState.Running) {
			return;
		}

		this.processPlayerInput();
		this.checkScore();
	}

	handlePaddleBallCollision() {
		const body = this.ball.body;
		const vel = body.velocity;
		vel.x *= 1.05;
		vel.y *= 1.05;

		body.setVelocity(vel.x, vel.y);
	}

	processPlayerInput() {
		const body = this.paddleLeft.body;

		if (this.cursors.up.isDown) {
			this.paddleLeft.y -= 10;
			body.updateFromGameObject();
		} else if (this.cursors.down.isDown) {
			this.paddleLeft.y += 10;
			body.updateFromGameObject();
		}
	}

	checkScore() {
		const x = this.ball.x;
		const leftBounds = -30;
		const rightBounds = 830;
		if (x >= leftBounds && x <= rightBounds) {
			return;
		}

		if (this.ball.x < leftBounds) {
			// scored on the left side
			this.incrementRightScore();
		} else if (this.ball.x > rightBounds) {
			// scored on the right side
			this.incrementLeftScore();
		}

		const maxScore = 7;
		if (this.leftScore >= maxScore) {
			this.gameState = GameState.PlayerWon;
		} else if (this.rightScore >= maxScore) {
			this.gameState = GameState.PlayerWon; //shoudl be changed later
		}

		if (this.gameState === GameState.Running) {
			this.resetBall();
		} else {
			this.ball.active = false;
			this.physics.world.remove(this.ball.body);

			this.scene.stop(GameBackgroundSceneKey);

			// show the game over/win screen
			this.scene.start(GameOverSceneKey, {
				leftScore: this.leftScore,
				rightScore: this.rightScore,
			});
		}
	}

	incrementLeftScore() {
		this.leftScore += 1;
		this.leftScoreLabel.text = this.leftScore;
	}

	incrementRightScore() {
		this.rightScore += 1;
		this.rightScoreLabel.text = this.rightScore;
	}

	resetBall() {
		this.ball.setPosition(400, 250);

		const angle = Phaser.Math.Between(0, 360);
		const vec = this.physics.velocityFromAngle(angle, 300);

		this.ball.body.setVelocity(vec.x, vec.y);
	}
}
