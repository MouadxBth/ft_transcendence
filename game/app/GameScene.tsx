import Phaser from "phaser";
import scoreScene from "./scoreScene";
let gameStarted: boolean = false;
let ball: any;
let p1: any, p2: any;
let cursor: any;
let RightScoreText: any, LeftScoreText: any;
let RightScore = 0;
let LeftScore = 0;

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.image("ball", "images/ball.png");
    this.load.image("paddle", "images/paddle.png");
  }

  
  create() {
    this.GameBackground();
    
    this.ScoreText();
    
    ball = this.physics.add.sprite(
      this.physics.world.bounds.width / 2,
      this.physics.world.bounds.height / 2,
      "ball"
      );
      p1 = this.physics.add.sprite(
        this.physics.world.bounds.width - (ball.body.width / 2 + 1),
        this.physics.world.bounds.height / 2,
      "paddle"
    );
    
    p2 = this.physics.add.sprite(
      ball.body.width / 2 + 1,
      this.physics.world.bounds.height / 2,
      "paddle"
      );
      this.physics.add.existing(ball);
      ball.body.setBounce(1, 1);
      ball.body.setMaxSpeed(400);
      ball.body.setCollideWorldBounds(true, 1, 1);
      ball.body.onWorldBounds = true;
      ball.setVisible(false);
      
      cursor = this.input.keyboard!.createCursorKeys();
      
      p1.setCollideWorldBounds(true);
      p2.setCollideWorldBounds(true);
      p1.setImmovable(true);
      p2.setImmovable(true);
      this.physics.add.collider(ball, p1, this.handlePaddleBallCollision, undefined, this);
    this.physics.add.collider(ball, p2, this.handlePaddleBallCollision, undefined, this);
  }
  
  update() {
    this.CheckScore();
    p1.body.setVelocityY(0);
    p2.body.setVelocityY(0);
    
    if (cursor.up.isDown) {
      p1.body.setVelocityY(-350);
    } else if (cursor.down.isDown) {
      p1.body.setVelocityY(350);
    }
    
    if (!gameStarted) {
      if (cursor.space.isDown) {
        ball.setVisible(true);
        gameStarted = true;
        const BallSpeedX = Math.random() * 200 + 50;
        const BallSpeedY = BallSpeedX;
        ball.setVelocityX(BallSpeedX);
        ball.setVelocityY(BallSpeedY);
      }
    }
  }
  
  isPlayer1Point() {
    return ball.body.x < p2.body.x;
  }
  isPlayer2Point() {
    return ball.body.x > p1.body.x;
  }
  GameBackground() {
    this.add.line(400, 300, 0, 0, 0, 800, 0xffffff, 1).setLineWidth(2.5, 2.5);
    
    this.add.circle(400, 300, 50).setStrokeStyle(5, 0xffffff, 1);
  }
  PaddleVelocity() {
    p1.body.setVelocityY(0);
    p2.body.setVelocityY(0);
    
    if (cursor.up.isDown) {
      p1.body.setVelocityY(-350);
    } else if (cursor.down.isDown) {
      p1.body.setVelocityY(350);
    }
  }
  handlePaddleBallCollision() {
    const body = ball.body;
    const vel = body.velocity;
    vel.x *= 1.05;
    vel.y *= 1.05;
    
    body.setVelocity(vel.x, vel.y);
  }
  resetBall()
	{
		ball.setPosition(400, 300)

		const angle = Phaser.Math.Between(0, 360)
		const vec = this.physics.velocityFromAngle(angle, 300)

		ball.body.setVelocity(vec.x, vec.y)
	}
  CheckScore() {
    if (this.isPlayer1Point()) {
      LeftScore += 1;
      LeftScoreText.text = LeftScore;
      this.resetBall()
      return 1;
    }
    if (this.isPlayer2Point()) {
      RightScore += 1;
      RightScoreText.text = RightScore;
      this.resetBall();
      return 1;
    }
    return 0;
  }
  ScoreText() {
    const scoreStyle = {
      fontSize: 48,
      fontFamily: "press",
    };
  
    RightScoreText = this.add
      .text(300, 125, "0", scoreStyle)
      .setOrigin(0.5, 0.5);
    LeftScoreText = this.add
      .text(500, 375, "0", scoreStyle)
      .setOrigin(0.5, 0.5);
  }
}
