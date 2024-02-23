import { GameBackgroundSceneKey, GameOverSceneKey, GameSceneKey } from "../consts/SceneKeys";

import { PressStart2P } from "../consts/FontKeys";
import { GameComponents } from "@/lib/game/GameComponents";
import { GameState } from "@/lib/game/GameState";
import { GameData } from "@/lib/types/game/game-data";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
import { GameMatchType } from "@/lib/types/game/game-match";

export class GameConfigScene extends Phaser.Scene {
	protected gameComponents!: GameComponents;
	protected midHeight!: number;
	protected midWidth!: number;

	init() {
		this.gameComponents = {
			maxScore: 7,
			lastScored: 1,
			powerUp: true,
			gameState: GameState.IDLE,
			isLeft: false,
			movement: false,
		} as GameComponents;

		this.midHeight = this.cameras.main.height / 2;
		this.midWidth = this.cameras.main.width / 2;
	}

	preload() {
		this.load.image("paddle", "paddle.png");
		this.load.image("ball", "ball.png");
	}

	create(data: GameData) {
		this.scene.run(GameBackgroundSceneKey);
		this.scene.sendToBack(GameBackgroundSceneKey);

		this.gameComponents.data = data;

		this.updateMovement(data);

		this.handleEndGame(data);

		this.handleBall();
		this.handleBallReset();
		this.handleBallCollision();
		this.handleScoreChange();
		this.handleSuper();
		this.handleNormal();

		this.configureBall();

		this.configurePaddles();

		this.configureScore();

		this.gameComponents.cursors = this.input.keyboard?.createCursorKeys();

		this.gameComponents.paddleHeight = this.gameComponents.paddleRight.displayHeight;
		this.startCountdown(this);
	}

	startCountdown(scene: Phaser.Scene) {
		this.gameComponents.gameState = GameState.COUNTDOWN;

		let countdown = 3;
		const countdownText = scene.add.text(
			this.midWidth - Math.round(0.1 * this.midWidth),
			this.midHeight,
			"",
			{
				fontSize: 48,
				fontFamily: PressStart2P,
				color: "#FFA500",
			}
		);
		countdownText.setOrigin(0.5);

		const countdownEvent = scene.time.addEvent({
			delay: 1000,
			repeat: 3,
			callback: () => {
				countdownText.text = countdown.toString();
				countdown--;

				if (countdown < 0) {
					// Countdown finished, remove the countdown text
					this.gameComponents.gameState = GameState.RUNNING;
					countdownText.destroy();
					countdownEvent.remove(); // Stop the timer event

					if (
						this.gameComponents.data.authenticatedUser?.user.username ===
						this.gameComponents.data.match.player1?.user.username
					) {
						this.gameComponents.data.context.game?.emit(
							"countdown_done",
							this.gameComponents.data.match
						);
					}
				}
			},
			callbackScope: scene,
		});
	}

	handleBall() {
		this.gameComponents.data.context.game?.on("ball_start", (angle: number, velocity: number) => {
			this.gameComponents.gameState = GameState.RUNNING;

			this.gameComponents.ball.setPosition(this.midWidth, this.midHeight);

			const vec = this.physics.velocityFromAngle(angle, velocity);

			this.gameComponents.ball.body.setVelocity(vec.x, vec.y);
		});
	}

	handleBallReset() {
		this.gameComponents.data.context.game?.on("ball_reset", (angle: number, velocity: number) => {
			this.gameComponents.ball.setPosition(this.midWidth, this.midHeight);

			const vec = this.physics.velocityFromAngle(angle, velocity);

			this.gameComponents.ball.body.setVelocity(vec.x, vec.y);
		});
	}

	handleSuper() {
		this.gameComponents.data.context.game?.on("super_paddle", (playerOne: boolean) => {
			if (playerOne) {
				this.gameComponents.paddleLeft.displayHeight = 150;
				this.gameComponents.paddleLeft.setTint(0xffa500);
				return;
			}

			this.gameComponents.paddleRight.displayHeight = 150;
			this.gameComponents.paddleRight.setTint(0xffa500);
		});
	}

	handleNormal() {
		this.gameComponents.data.context.game?.on("normal_paddle", (playerOne: boolean) => {
			if (playerOne) {
				this.gameComponents.paddleLeft.displayHeight = this.gameComponents.paddleHeight;
				this.gameComponents.paddleLeft.clearTint();
				return;
			}

			this.gameComponents.paddleRight.displayHeight = this.gameComponents.paddleHeight;
			this.gameComponents.paddleRight.clearTint();
		});
	}

	handleBallCollision() {
		this.gameComponents.data.context.game?.on("ball_change", (x: number, y: number) => {
			this.gameComponents.ball.body.setVelocity(x, y);
		});
	}

	handleScoreChange() {
		this.gameComponents.data.context.game?.on("score_change", (first: number, second: number) => {
			this.gameComponents.leftScoreLabel.text = `${first}`;
			this.gameComponents.rightScoreLabel.text = `${second}`;
		});
	}

	updateMovement({ context, match }: GameData) {
		context.game?.on("player_moved", (player: GameMatchPlayerType, velocity: number) => {
			if (match.player1?.user.username === player.user.username) {
				this.gameComponents.paddleLeft.setVelocityY(velocity);
				return;
			}
			// right paddle
			this.gameComponents.paddleRight.setVelocityY(velocity);
		});
	}

	handleEndGame({ context, authenticatedUser }: GameData) {
		context.game?.on(
			"end_game",
			(winner: GameMatchPlayerType, loser: GameMatchPlayerType, game: GameMatchType) => {
				this.gameComponents.gameState = GameState.PLAYER_WON;

				this.gameComponents.ball.active = false;
				this.physics.world.remove(this.gameComponents.ball.body);
				this.scene.stop(GameBackgroundSceneKey);

				this.scene.start(GameOverSceneKey, {
					winner,
					loser,
					authenticatedUser,
					game,
				});
			}
		);
	}

	handlePaddleBallCollision() {
		const body = this.gameComponents.ball.body;
		const { x, y } = body.velocity;

		if (
			this.gameComponents.data.authenticatedUser?.user.username ===
			this.gameComponents.data.match.player1?.user.username
		) {
			this.gameComponents.data.context.game?.emit("change_ball", {
				game: this.gameComponents.data.match,
				x: x * 1.5,
				y: y * 1.5,
			});
		}
	}

	private configureBall() {
		this.gameComponents.ball = this.physics.add.sprite(this.midWidth, this.midHeight, "ball");
		this.physics.add.existing(this.gameComponents.ball);
		this.gameComponents.ball.body.setBounce(1, 1);
		this.gameComponents.ball.body.setMaxSpeed(800);
		this.gameComponents.ball.body.setCollideWorldBounds(true, 1, 1);

		this.gameComponents.ball.body.onWorldBounds = true;
		this.physics.world.on("worldbounds", this.onWorldBoundsHandler, this);
	}

	private onWorldBoundsHandler(body: Phaser.Physics.Arcade.Body) {
		if (
			this.gameComponents.data.authenticatedUser?.user.username ===
			this.gameComponents.data.match.player1?.user.username
		) {
			this.gameComponents.data.context.game?.emit("change_ball", {
				x: body.velocity.x,
				y: body.velocity.y,
				game: this.gameComponents.data.match,
			});
		}
	}

	private configurePaddles() {
		this.gameComponents.paddleLeft = this.physics.add.sprite(
			Math.round(0.0625 * this.midWidth),
			this.midHeight,
			"paddle"
		);
		this.gameComponents.paddleLeft.setCollideWorldBounds(true);
		this.gameComponents.paddleLeft.setImmovable(true);

		this.gameComponents.paddleRight = this.physics.add.sprite(
			this.cameras.main.width - Math.round(0.0625 * this.midWidth),
			this.midHeight,
			"paddle"
		);
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
			fontSize: 68,
			fontFamily: PressStart2P,
		};

		const heightOffset = Math.round(0.2 * this.midHeight);

		this.gameComponents.leftScoreLabel = this.add
			.text(this.midWidth / 2, heightOffset, "0", scoreStyle)
			.setOrigin(0.5, 0.5);

		this.gameComponents.rightScoreLabel = this.add
			.text(
				this.midWidth + this.midWidth / 2,
				this.cameras.main.height - heightOffset,
				"0",
				scoreStyle
			)
			.setOrigin(0.5, 0.5);
	}
}
