import Phaser from "phaser";

import { GameBackgroundSceneKey, GameOverSceneKey } from "../consts/SceneKeys";
import * as Colors from "../consts/Colors";

import { PressStart2P } from "../consts/FontKeys";

const GameState = {
	Running: "running",
	PlayerWon: "player-won",
	Start : false
};
export class PongGame extends Phaser.Scene {
	gameState: any;
	lastScored : number = 1; //1 for left paddle 2 for right paddle
	p1Score : number = 0;
	p2Score : number = 0;

	//paddles variables
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

	//power up
	powerUp = true;

	init() {
		this.gameState = GameState.Running;
		this.leftScore = 0;
		this.rightScore = 0;
	}
	preload() {
		this.load.image("paddle", "paddle.png");
		this.load.image("ball", "ball.png");
	}
	create() {
		this.scene.run(GameBackgroundSceneKey);
		this.scene.sendToBack(GameBackgroundSceneKey);

		this.ball = this.physics.add.sprite(400, 300, "ball");
		this.physics.add.existing(this.ball);
		this.ball.body.setBounce(1, 1);
		this.ball.body.setMaxSpeed(800);
		this.ball.body.setCollideWorldBounds(true, 1, 1);

		this.paddleLeft = this.physics.add.sprite(50, 300, "paddle");
		this.paddleLeft.setCollideWorldBounds(true);
		this.paddleLeft.setImmovable(true);
		this.paddleRight = this.physics.add.sprite(750, 300	, "paddle");
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

		// this.time.delayedCall(1500, () => {
		// 	this.resetBall();
		// });
	}

	update() {
		if (this.gameState !== GameState.Running) {
			return;
		}
		this.ballVelocity();
		this.processPlayerInput();
		this.checkScore();
		this.powerUpActivation();
	}

	ballVelocity() {
		if (GameState.Start === false) {
			GameState.Start = true;
			this.ball.setVelocityX(300);
			this.ball.setVelocityY(300);
		}
	}
	handlePaddleBallCollision() {
		const body = this.ball.body;
		const vel = body.velocity;
		vel.x *= 1.5;
		vel.y *= 1.5;
		body.setVelocity(vel.x, vel.y);
	}

	processPlayerInput() {
		if (this.cursors.up.isDown) {
			this.paddleLeft.y -= 10;
		} else if (this.cursors.down.isDown) {
			this.paddleLeft.y += 10;
			// body.updateFromGameObject()
		}
	}

	checkScore() {
		if (this.ball.body.x < this.paddleLeft.body.x - 20) {
			this.incrementRightScore();
			this.resetBall();
			if (this.lastScored === 2)
			{
				this.lastScored = 1;
				this.p1Score = 1;
			}
			else
				this.p1Score++;
		} else if (this.ball.body.x > this.paddleRight.body.x + 20) {
			this.incrementLeftScore();
			this.resetBall();
			if (this.lastScored === 1)
			{
				this.lastScored = 2;
				this.p2Score = 1;
			}
			else
				this.p2Score++;
		}
		const maxScore = 7;
		if (this.leftScore >= maxScore) {
			this.gameState = GameState.PlayerWon;
		} else if (this.rightScore >= maxScore) {
			this.gameState = GameState.PlayerWon; //shoudl be changed later
		} else if (this.gameState === this.gameState.PlayerWon) {
			this.ball.active = false;
			this.physics.world.remove(this.ball.body);
			this.scene.stop(GameBackgroundSceneKey);
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
		this.ball.setPosition(400, 300);
		if (Math.random() < 0.5) {
			angle = Phaser.Math.Between(-120, -170);
		} else {
			angle = Phaser.Math.Between(0, 60);
		}
		console.log("angle " + angle);
		const vec = this.physics.velocityFromAngle(angle, 300);

		this.ball.body.setVelocity(vec.x, vec.y);
	}
	powerUpActivation()
	{
		if (this.p1Score === 2)
			//logic for powerup
		this.paddleLeft.displayHeight = 150;
		else if (this.p2Score === 2)
			this.paddleRight.displayHeight = 150;
		else if (this.p1Score !== 0)
			this.paddleLeft.displayHeight = 100;
		else if (this.p2Score !== 0)
			this.paddleRight.displayHeight = 100;
	}
}
