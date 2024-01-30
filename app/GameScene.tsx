import Phaser from "phaser";
import io from "socket.io-client";

const socket: any = io("http://localhost:3001");

import {
  BallCords,
  PlayerMovementDto,
  PlayerDto,
  MatchResultDto,
} from "./my_types";
import { on } from "events";

export default class GameScene extends Phaser.Scene {
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
  //test
  playerData = {};
  ///

  // here start the new variable for the architecture
  MatchResult = new MatchResultDto();
  playerMovement = new PlayerMovementDto();
  drawButton: any;
  constructor() {
    super({ key: "GameScene" });
  }
  preload() {
    this.load.image("ball", "images/ball.png");
    this.load.image("paddle", "images/paddle.png");
  }
  
  create() {
    socket.on("connect", () => {
    //legacy code --------------------------------------
    socket.on("updatePlayer", (data: any) => {
        this.playerData = data;
      });
      socket.on("playerID", (pID: any) => {
          this.playerID = pID;
        });
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
              this.physics.world.bounds.height / 2 ,
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
      // this.ballSync();
      this.newBallSync();
      this.updateGame();
    }
  }

  newBallSync()
  {
    socket.on("send-ball", (ballobj : any) => {
      this.ball.setVelocityX = ballobj.x;
      this.ball.setVelocityY = ballobj.y;
    })
  }
  
  // ballSync() {
  //   const newBallCords = { x: this.ball.x, y: this.ball.y };
  //   if (
  //     !this.lastBallCords ||
  //     this.hasChanged(this.lastBallCords, newBallCords)
  //     ) {
  //       socket.emit("getBallCords", newBallCords);
  //     this.lastBallCords = { ...newBallCords };
  //   }

  //   socket.on("updateBall", (ball: BallCords) => {
  //     if (this.hasChanged({ x: this.ball.x, y: this.ball.y }, ball)) {
  //       this.ball.y = ball.y;
  //       this.ball.x = ball.x;
  //     }
  //   });
  // }

  // hasChanged(obj1: BallCords, obj2: BallCords) {
  //   const tolerance = 0.1;
  //   return (
  //     Math.abs(obj1.x - obj2.x) > tolerance ||
  //     Math.abs(obj1.y - obj2.y) > tolerance
  //   );
  // }

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
        console.log("player id " + player.playerID);
        if (player.playerID === 1) {
          this.p1.y = player.y;
        } else if (player.playerID === 2) {
          this.p2.y = player.y;
        }
      });
    });
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
      this.p2.displayHeight = 150; //function for the powerup
      this.resetBall();
      return 1;
    }
    const maxScore = 7; //
    if (this.LeftScore >= maxScore) {
      //player 1 always on the left side
      this.MatchResult.Player1.winner = true;
      this.MatchResult.Player1.points += 1; //prob gonna be changed
    } else if (this.RightScore >= maxScore) {
      this.MatchResult.Player2.winner = true;
      this.MatchResult.Player2.points += 1;
    }
    //draw button pressed logic

    // this.playerWon();
    // this.playerDraw();
    return 0;
  }

  // playerDraw() {
  //   if (
  //     this.MatchResult.Player1.draw == true ||
  //     this.MatchResult.Player2.draw == true
  //   ) {
  //     this.emitGameEnd();
  //   }
  // }
  // playerWon() {
  //   if (
  //     this.MatchResult.Player1.winner == true || 
  //     this.MatchResult.Player2.winner == true
  //   ) {
  //     this.MatchResult.Player1.score = this.LeftScore;
  //     this.MatchResult.Player2.score = this.RightScore;
  //     //points will be added later
  //     if (this.playerMovement.pid === 1) this.emitGameEnd();
  //   }
  // }

  // emitGameEnd() {
  //   socket.emit("end_game", this.MatchResult);
  //   socket.on("game_ended", (dto: MatchResultDto) => {
  //     this.MatchResult = dto;
  //   });
  // }
  gameOver() {
    this.ball.active = false;
    this.physics.world.remove(this.ball.body);
    this.scene.stop("GameScene");
    this.scene.start("gameOver", this.MatchResult);
  }
  ScoreText() {
    const scoreStyle = {
      fontSize: 48,
      fontFamily: "Arial", //should be changed later
    };
    this.RightScoreText = this.add
      .text(300, 125, "0", scoreStyle)
      .setOrigin(0.5, 0.5);
    this.LeftScoreText = this.add
      .text(500, 375, "0", scoreStyle)
      .setOrigin(0.5, 0.5);
  }
}
