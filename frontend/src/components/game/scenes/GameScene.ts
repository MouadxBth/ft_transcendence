import { GameState } from "@/lib/game/GameState";
import { GameBackgroundSceneKey, GameOverSceneKey } from "../consts/SceneKeys";
import { GameConfigScene } from "./GameConfigScene";

export class GameScene extends GameConfigScene {
	update() {
		// this.processPlayerInput();
		this.checkScore();
	}

	processPlayerInput() {
		if (this.gameComponents.gameState !== GameState.RUNNING) return;
		const { paddleLeft, paddleRight, cursors, data } = this.gameComponents;
		if (!cursors) return;

		const { game } = data.context;

		const isLeft = data.match.player1?.user.username === data.authenticatedUser?.user.username;

		const paddle = isLeft ? paddleLeft : paddleRight;

		const player =
			data.match.player1?.user.username === data.authenticatedUser?.user.username
				? data.match.player1
				: data.match.player2;

		const opponent =
			data.match.player1?.user.username === data.authenticatedUser?.user.username
				? data.match.player2
				: data.match.player1;

		// Adjust the speed and damping for the sliding effect
		const slidingSpeed = 500;

		if (cursors.up.isDown) {
			paddle.setVelocityY(-slidingSpeed);

			this.gameComponents.movement = true;
			game?.emit("player_move", { player, opponent, velocity: -slidingSpeed });
		} else if (cursors.down.isDown) {
			paddle.setVelocityY(slidingSpeed);

			this.gameComponents.movement = true;
			game?.emit("player_move", { player, opponent, velocity: slidingSpeed });
		} else {
			if (this.gameComponents.movement) {
				this.gameComponents.movement = false;
				game?.emit("player_move", { player, opponent, velocity: 0 });
			}

			paddle.setVelocityY(0);
		}
	}

	checkScore() {
		const left = this.gameComponents.ball.body.x <= 0;
		const right =
			this.gameComponents.ball.body.x >=
			this.cameras.main.width - this.gameComponents.ball.body.width;

		if (left) {
			//right paddle scored
			this.gameComponents.ball.setPosition(this.midWidth, this.midHeight);

			this.incrementRightScore();
		} else if (right) {
			this.gameComponents.ball.setPosition(this.midWidth, this.midHeight);

			this.incrementLeftScore();
		}
	}

	incrementLeftScore() {
		const { context, match, authenticatedUser } = this.gameComponents.data;

		if (authenticatedUser?.user.username === match.player1!.user.username) {
			context.game?.emit("player_score", match.player1!.user.username);
		}
	}

	incrementRightScore() {
		const { context, match, authenticatedUser } = this.gameComponents.data;

		if (authenticatedUser?.user.username === match.player1!.user.username) {
			context.game?.emit("player_score", match.player2!.user.username);
		}
	}
}
