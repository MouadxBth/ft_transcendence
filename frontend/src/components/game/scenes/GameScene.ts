import { GameComponents } from "@/lib/game/GameComponents";
import { GameState } from "@/lib/game/GameState";
import { GameBackgroundSceneKey, GameOverSceneKey } from "../consts/SceneKeys";
import { GameConfigScene } from "./GameConfigScene";

export class GameScene extends GameConfigScene {
	update() {
		// if (this.gameComponents.gameState !== GameState.RUNNING) return;

		this.ballVelocity();
		this.processPlayerInput();
		this.checkScore();
		// this.powerUpActivation();
	}

	ballVelocity() {
		if (this.gameComponents.gameState !== GameState.IDLE) return;

		this.gameComponents.gameState = GameState.RUNNING;
		this.gameComponents.ball.setVelocityX(300);
		this.gameComponents.ball.setVelocityY(300);
	}

	processPlayerInput() {
		if (!this.gameComponents.cursors) return;

		if (this.gameComponents.cursors.up.isDown) {
			this.gameComponents.socket.emit("playerMoved", "up");
			// this.gameComponents.paddleLeft.y -= 10;
		} else if (this.gameComponents.cursors.down.isDown) {
			this.gameComponents.socket.emit("playerMoved", "down");
			// this.gameComponents.paddleLeft.y += 10;
		}
	}

	updatePlayers() {
		this.gameComponents.socket.on("updatePlayers", (playerData : any) => {
			Object.values(playerData).forEach((playerValues: any) => {
				if (playerValues.playerValuesID === 1) {
					this.gameComponents.paddleLeft.y = this.gameComponents.player.y;
				} else if (playerValues.playerID === 2) {
					this.gameComponents.paddleRight.y = this.gameComponents.player.y;
				}
			});
		});
	}

	checkScore() {
		if (this.gameComponents.ball.body.x < this.gameComponents.paddleLeft.body.x - 20) {
			//right paddle scored
			this.incrementRightScore();
			this.resetBall();
			// if (this.lastScored === 1) {
			// 	this.lastScored = 2;
			// 	this.p2Score = 1;
			// } else this.p2Score++;
		} else if (this.gameComponents.ball.body.x > this.gameComponents.paddleRight.body.x + 20) {
			this.incrementLeftScore();
			this.resetBall();
			// if (this.lastScored === 2) {
			// 	this.lastScored = 1;
			// 	this.p1Score = 1;
			// } else this.p1Score++;
		}
		const maxScore = 7;

		if (this.gameComponents.leftScore >= maxScore) {
			this.gameComponents.gameState = GameState.PLAYER_WON;
		} else if (this.gameComponents.rightScore >= maxScore) {
			this.gameComponents.gameState = GameState.PLAYER_WON; //shoudl be changed later
		}

		if (this.gameComponents.gameState === GameState.PLAYER_WON) {
			this.gameComponents.ball.active = false;
			this.physics.world.remove(this.gameComponents.ball.body);
			this.scene.stop(GameBackgroundSceneKey);

			this.scene.start(GameOverSceneKey, {
				leftScore: this.gameComponents.leftScore,
				rightScore: this.gameComponents.rightScore,
			});
		}
	}

	incrementLeftScore() {
		this.gameComponents.leftScore += 1;
		this.gameComponents.leftScoreLabel.text = `${this.gameComponents.leftScore}`;
	}

	incrementRightScore() {
		this.gameComponents.rightScore += 1;
		this.gameComponents.rightScoreLabel.text = `${this.gameComponents.rightScore}`;
	}

	resetBall() {
		const angle =
			Math.random() < 0.5 ? Phaser.Math.Between(-120, -170) : Phaser.Math.Between(0, 60);

		this.gameComponents.ball.setPosition(400, 300);

		const vec = this.physics.velocityFromAngle(angle, 300);

		this.gameComponents.ball.body.setVelocity(vec.x, vec.y);
	}
	// powerUpActivation() {
	// 	//need to check if power ups are enabled
	// 	if (this.p1Score === 2) {
	// 		//logic for powerup
	// 		this.paddleLeft.displayHeight = 150;
	// 		this.p1Score = 0;
	// 		this.p2Score = 0;
	// 	} else if (this.p2Score === 2) {
	// 		this.paddleRight.displayHeight = 150;
	// 		this.p1Score = 0;
	// 		this.p2Score = 0;
	// 	}
	// 	if (this.p1Score !== 0) this.paddleLeft.displayHeight = this.paddleHeight;
	// 	if (this.p2Score !== 0) this.paddleRight.displayHeight = this.paddleHeight;
	// }
}
