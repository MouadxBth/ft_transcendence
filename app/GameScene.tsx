import Phaser from "phaser";
import io from "socket.io-client";

const socket: any = io("http://localhost:3001");

import { BallCords} from "./my_types";

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

  constructor() {
    super({ key: "copy_GameScene" });
  }
  init(game : any)
  {
    console.log("init " + game);
  }
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

    this.physics.add.existing(this.ball);
    this.ball.body.setBounce(1, 1);
    this.ball.body.setMaxSpeed(400);
    this.ball.body.setCollideWorldBounds(true, 1, 1);
    this.ball.body.onWorldBounds = true;
    this.ball.setVisible(false);
   // Add a listener for the worldbounds event
   this.physics.world.on('worldbounds', function (body : any) {
    // Check if the body involved in the event is your ball
    if (body.gameObject === this.ball) {
      // Handle the collision with world bounds (e.g., change direction)
        console.log('Ball collided with world bounds');
        socket.emit("ball-cord", this.ball.setVelocity(this.ball.body.velocity));
    }
  }, this);
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
      this.ballSync();
      this.updateGame();
    }
  }

  ballSync() {
    const newBallCords = { x: this.ball.x, y: this.ball.y };
    if (
      !this.lastBallCords ||
      this.hasChanged(this.lastBallCords, newBallCords)
    ) {
      socket.emit("getBallCords", newBallCords);
      this.lastBallCords = { ...newBallCords };
    }

    socket.on("updateBall", (ball: BallCords) => {
      if (this.hasChanged({ x: this.ball.x, y: this.ball.y }, ball)) {
        this.ball.y = ball.y;
        this.ball.x = ball.x;
      }
    });
  }

  hasChanged(obj1: BallCords, obj2: BallCords) {
    const tolerance = 0.1;
    return (
      Math.abs(obj1.x - obj2.x) > tolerance ||
      Math.abs(obj1.y - obj2.y) > tolerance
    );
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
        if (player.playerId === 1) {
          this.p1.y = player.y;
        } else if (player.playerId === 2) {
          this.p2.y = player.y;
        }
      });
    });
  }

  powerUpActivation() {
		//need to check if power ups are enabled
		if (this.p1Score === 2) {
			//logic for powerup
			this.paddleLeft.displayHeight = 150;
			this.p1Score = 0;
			this.p2Score = 0;
		} else if (this.p2Score === 2) {
			this.paddleRight.displayHeight = 150;
			this.p1Score = 0;
			this.p2Score = 0;
		}
		if (this.p1Score !== 0) this.paddleLeft.displayHeight = this.paddleHeight;
		if (this.p2Score !== 0) this.paddleRight.displayHeight = this.paddleHeight;
	}

  isPlayer1Point() {
    return this.ball.body.x < this.p2.body.x;
  }
  isPlayer2Point() {
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
  CheckScore() {
    if (this.isPlayer1Point()) {
      this.LeftScore += 1;
      this.LeftScoreText.text = this.LeftScore;
      this.resetBall();
      return 1;
    }
    if (this.isPlayer2Point()) {
      this.RightScore += 1;
      this.RightScoreText.text = this.RightScore;

this.resetBall();
  // if (this.lastScored === 1) {
  // 	this.lastScored = 2;
  // 	this.p2Score = 1;
// } else this.p2Score++;      this.resetBall();
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
