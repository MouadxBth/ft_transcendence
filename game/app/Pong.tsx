"use client";
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

let ball : any;
let p1 : any, p2 : any;
let cursor : any;
let game : any;


const config : any = {
    type: Phaser.AUTO,
    backgroundColor: '#2361a8',
    width: 800,
    height: 600,
      // scale: {
      //     mode: Phaser.Scale.RESIZE,
      //     autoCenter: Phaser.Scale.CENTER_BOTH
      // },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: false,
        }
      }
}

  
function preload()
{
  this.load.image('ball', '../public/images/ball.png');
  this.load.image('paddle', '../public/images/paddle.png');
}

function create()
{
  ball = this.physics.add.sprite(
    this.physics.world.bounds.width / 2, 
    this.physics.world.bounds.height / 2, 
    'ball'
);
  p1 = this.physics.add.sprite(
    this.physics.world.bounds.width - (ball.body.width / 2 + 1), 
    this.physics.world.bounds.height / 2, 
    'paddle',
  );

  p2 = this.physics.add.sprite(
    (ball.body.width / 2 + 1), 
    this.physics.world.bounds.height / 2, 
    'paddle',
);
    this.physics.add.existing(ball)
    ball.body.setBounce(1, 1)
    ball.body.setMaxSpeed(400)
    ball.body.setCollideWorldBounds(true, 1, 1)
    ball.body.onWorldBounds = true

    cursor = this.input.keyboard.createCursorKeys();

    p1.setCollideWorldBounds(true);
    p2.setCollideWorldBounds(true);
    p1.setImmovable(true);
    p2.setImmovable(true);
    this.physics.add.collider(ball, p1, null, null, this);
    this.physics.add.collider(ball, p2, null, null, this);

}
let gameStarted = false
function update()
{
  if (isPlayer1Point()) {
     ball.disableBody(true, true);
     this.scene.restart();
     return;
 }
 if (isPlayer2Point()) {
     ball.disableBody(true, true);
     this.scene.restart();
     return;
 }
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
            const initialXSpeed = Math.random() * 200 + 50;
            const initialYSpeed = Math.random() * 200 + 50;
            ball.setVelocityX(initialXSpeed);
            ball.setVelocityY(initialYSpeed);
        }
    }
    function isPlayer1Point() {
      return ball.body.x < p2.body.x;
  }
  
  function isPlayer2Point() {
      return ball.body.x > p1.body.x;
  }
    
}

function checkColor(color : any)
{
    if (color === "black")
      return ("#000000");
    else if (color === "green")
      return ("#228b22")
    else
      return ("#741b85")
}

function Pong(props : any) {
  useEffect(() => {
      config.backgroundColor =  checkColor(props.color);
      game = new Phaser.Game(config);
      return () => {
        game.destroy(true);
      };
  }, []);

  return <div id="game-container" />;
}

export default Pong;


