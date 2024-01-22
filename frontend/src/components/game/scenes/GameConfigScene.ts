import { GameBackgroundSceneKey, GameSceneKey } from "../consts/SceneKeys";

import { PressStart2P } from "../consts/FontKeys";
import { GameComponents } from "@/lib/game/GameComponents";
import { GameState } from "@/lib/game/GameState";

export class GameConfigScene extends Phaser.Scene {
	gameComponents!: GameComponents;

	init() {
		this.gameComponents = {
			lastScored: 1,
			p1Score: 0,
			p2Score: 0,
			leftScore: 0,
			rightScore: 0,
			powerUp: true,
			gameState: GameState.IDLE,
		} as GameComponents;
	}

	preload() {
		this.load.image("paddle", "paddle.png");
		this.load.image("ball", "ball.png");
	}
	create() {
		this.scene.run(GameBackgroundSceneKey);
		this.scene.sendToBack(GameBackgroundSceneKey);

		this.configureBall();

		this.configurePaddles();

		this.configureScore();

		this.gameComponents.cursors = this.input.keyboard?.createCursorKeys();

		// this.time.delayedCall(1500, () => {
		// 	this.resetBall();
		// });
		this.gameComponents.paddleHeight = this.gameComponents.paddleRight.displayHeight;
	}

	handlePaddleBallCollision() {
		const body = this.gameComponents.ball.body;
		const vel = body.velocity;
		vel.x *= 1.5;
		vel.y *= 1.5;
		body.setVelocity(vel.x, vel.y);
	}

	private configureBall() {
		this.gameComponents.ball = this.physics.add.sprite(400, 300, "ball");
		this.physics.add.existing(this.gameComponents.ball);
		this.gameComponents.ball.body.setBounce(1, 1);
		this.gameComponents.ball.body.setMaxSpeed(800);
		this.gameComponents.ball.body.setCollideWorldBounds(true, 1, 1);
	}

	private configurePaddles() {
		this.gameComponents.paddleLeft = this.physics.add.sprite(50, 300, "paddle");
		this.gameComponents.paddleLeft.setCollideWorldBounds(true);
		this.gameComponents.paddleLeft.setImmovable(true);

		this.gameComponents.paddleRight = this.physics.add.sprite(750, 300, "paddle");
		this.gameComponents.paddleRight.setCollideWorldBounds(true);
		this.gameComponents.paddleRight.setImmovable(true);

		this.physics.add.collider(
			this.gameComponents.paddleLeft,
			this.gameComponents.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		);
		this.physics.add.collider(
			this.gameComponents.paddleRight,
			this.gameComponents.ball,
			this.handlePaddleBallCollision,
			undefined,
			this
		);
	}

	private configureScore() {
		const scoreStyle = {
			fontSize: 48,
			fontFamily: PressStart2P,
		};

		this.gameComponents.leftScoreLabel = this.add
			.text(300, 125, `${this.gameComponents.leftScore}`, scoreStyle)
			.setOrigin(0.5, 0.5);

		this.gameComponents.rightScoreLabel = this.add
			.text(500, 375, `${this.gameComponents.rightScore}`, scoreStyle)
			.setOrigin(0.5, 0.5);
	}
}
