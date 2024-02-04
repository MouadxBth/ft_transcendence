import Phaser from "phaser";
import io from "socket.io-client";

const socket: any = io("http://localhost:3001");

import { BallCords } from "./my_types";

export default class copy_GameScene extends Phaser.Scene {
	playerData = {};
	lastBallCords: BallCords;
	playerID: number;
	ball: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	p1: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	p2: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	cursor: any;
	RightScoreText: any;
	LeftScoreText: any;
	RightScore: number = 0;
	LeftScore: number = 0;
	gameStarted: boolean = false;

	//power up vars
	p1Score = 0;
	p2Score = 0;
	paddleHeight = 0;
	lastScored = 1; //for left player p1

	preload() {
		this.load.image("ball", "images/ball.png");
		this.load.image("paddle", "images/paddle.png");
	}

	create() {
		socket.on("connect", () => {
			socket.on("updatePlayer", (data: any) => {
				this.playerData = data;
			});
		});
		socket.on("playerID", (pID: any) => {
			this.playerID = pID;
		});

		this.GameBackground();
		this.ScoreText();

		this.ball = this.physics.add.sprite(
			this.physics.world.bounds.width / 2,
			this.physics.world.bounds.height / 2,
			"ball"
		);
		//p1 paddle
		this.p1 = this.physics.add.sprite(
			this.physics.world.bounds.width - (this.ball.body.width / 2 + 1),
			this.physics.world.bounds.height / 2,
			"paddle"
		);
		this.p1.setCollideWorldBounds(true);
		this.p1.setImmovable(true);
		this.physics.add.collider(
			this.ball,
			this.p1,
			this.handlePaddleBallCollision,
			undefined,
			this
		);
		//p2 paddle
		this.p2 = this.physics.add.sprite(
			this.ball.body.width / 2 + 1,
			this.physics.world.bounds.height / 2,
			"paddle"
		);
		this.p2.setCollideWorldBounds(true);
		this.p2.setImmovable(true);
		this.physics.add.collider(
			this.ball,
			this.p2,
			this.handlePaddleBallCollision,
			undefined,
			this
		);
		///storing paddle height
		this.paddleHeight = this.p1.displayHeight;

		this.physics.add.existing(this.ball);
		this.ball.body.setBounce(1, 1);
		this.ball.body.setMaxSpeed(400);
		this.ball.body.setCollideWorldBounds(true, 1, 1);
		this.ball.body.onWorldBounds = true;
		this.ball.setVisible(false);
		// Add a listener for the worldbounds event
		this.physics.world.on(
			"worldbounds",
			function (body: any) {
				// Check if the body involved in the event is your ball
				if (body.gameObject === this.ball) {
					// Handle the collision with world bounds (e.g., change direction)
					console.log("Ball collided with world bounds");
				}
			},
			this
		);
		this.cursor = this.input.keyboard!.createCursorKeys();
	}

	update() {
		this.CheckScore();
		this.handleInput();
		if (!this.gameStarted) {
			if (this.cursor.space.isDown) {
				this.ball.setVisible(true);
				this.gameStarted = true;
				const BallSpeedX = 250;
				const BallSpeedY = BallSpeedX;
				this.ball.setVelocityX(BallSpeedX);
				this.ball.setVelocityY(BallSpeedY);
			}
		} else {
			// this.ballSync();
			this.updateGame();
			this.powerUpActivation();
		}
	}

	handleInput() {
		this.p1.body.setVelocityY(0);
		this.p2.body.setVelocityY(0);

		if (this.cursor.up.isDown) {
			socket.emit("press", "up");
		} else if (this.cursor.down.isDown) {
			socket.emit("press", "down");
		}
	}

	updateGame() {
		socket.on("updatePlayers", (updatedPlayers: any) => {
			Object.values(updatedPlayers).forEach((player: any) => {
				if (player.playerID === 1) {
					this.p1.y = player.y;
				} else if (player.playerID === 2) {
					this.p2.y = player.y;
				}
			});
		});
	}

	
	isPlayer1Point() {
		//p1 scored
		return this.ball.body.x < this.p2.body.x;
	}
	isPlayer2Point() {
		//p2 scored
		return this.ball.body.x > this.p1.body.x;
	}
	GameBackground() {
		this.add.line(400, 300, 0, 0, 0, 800, 0xffffff, 1).setLineWidth(2.5, 2.5);
		
		this.add.circle(400, 300, 50).setStrokeStyle(5, 0xffffff, 1);
	}
	
	handlePaddleBallCollision() {
		const body = this.ball.body;
		const vel = body.velocity;
		vel.x *= 1.05;
		vel.y *= 1.05;
		
		body.setVelocity(vel.x, vel.y);
	}
	resetBall() {
		this.ball.setPosition(400, 300);
		
		const angle = Phaser.Math.Between(0, 360);
		const vec = this.physics.velocityFromAngle(angle, 300);
		
		this.ball.body.setVelocity(vec.x, vec.y);
	}

	powerUpActivation() {
		//need to check if power ups are enabled
		if (this.p1Score === 2) {
			//logic for powerup
			this.p1.displayHeight = 150;
			this.p1Score = 0;
			this.p2Score = 0;
		} else if (this.p2Score === 2) {
			this.p2.displayHeight = 150;
			this.p1Score = 0;
			this.p2Score = 0;
		}
		if (this.p1Score !== 0) this.p1.displayHeight = this.paddleHeight;
		if (this.p2Score !== 0) this.p2.displayHeight = this.paddleHeight;
	}
	
	CheckScore() {
		if (this.isPlayer1Point()) {
			//p1 left scored
			this.LeftScore += 1;
			this.LeftScoreText.text = this.LeftScore;

			if (this.lastScored === 2) {
				this.lastScored = 1;
				this.p1Score = 1;
			} else this.p1Score++;
			this.resetBall();
			return 1;
		}
		if (this.isPlayer2Point()) {
			//p2 right scored
			this.RightScore += 1;
			this.RightScoreText.text = this.RightScore;

			if (this.lastScored === 1) {
				this.lastScored = 2;
				this.p2Score = 1;
			} else this.p2Score++;
			this.resetBall();
			return 1;
		}

		return 0;
	}
	ScoreText() {
		const scoreStyle = {
			fontSize: 48,
			fontFamily: "press", //should be changed later
		};

		this.RightScoreText = this.add
			.text(300, 125, "0", scoreStyle)
			.setOrigin(0.5, 0.5);
		this.LeftScoreText = this.add
			.text(500, 375, "0", scoreStyle)
			.setOrigin(0.5, 0.5);
	}
}
