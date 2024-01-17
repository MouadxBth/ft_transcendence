import Phaser from "phaser";

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
	preload() {
		this.load.image("paddle", "paddle.png");
	}
	create() {
		this.scene.run(GameBackgroundSceneKey);
		this.scene.sendToBack(GameBackgroundSceneKey);


		this.ball = this.add.circle(400, 250, 10, Colors.White, 1);
		this.physics.add.existing(this.ball);
		this.ball.body.setCircle(10);
		this.ball.body.setBounce(1, 1);
		this.ball.body.setMaxSpeed(400);
		this.ball.body.setCollideWorldBounds(true, 1, 1);

		this.paddleLeft = this.physics.add.sprite(50, 250, "paddle");
		this.paddleLeft.setCollideWorldBounds(true);
		this.paddleLeft.setImmovable(true);
		this.paddleRight = this.physics.add.sprite(750, 250, "paddle");
		this.paddleRight.setCollideWorldBounds(true);
		this.paddleRight.setImmovable(true);

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
		console.log("?????")
		if (this.gameState !== GameState.Running) {
			return;
		}

		this.processPlayerInput();
		this.checkScore()
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
		} else if (this.cursors.down.isDown) {
			this.paddleLeft.y += 10;
			// body.updateFromGameObject()
		}
	}

	checkScore() {
		
		if (this.ball.x <= this.paddleLeft.body.x) {
			// scored on the left side
			this.incrementRightScore();
		} else if (this.ball.x >= this.paddleRight.body.x) {
			console.log("ball x " + this.ball.x)

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
		let angle;
		this.ball.setPosition(400, 250);
		if (Math.random() % 2 === 0) {
			angle = Phaser.Math.Between(0, -60);
		} else {
			angle = Phaser.Math.Between(0, 60);
		}
		const vec = this.physics.velocityFromAngle(angle, 300);

		this.ball.body.setVelocity(vec.x, vec.y);
	}
}
