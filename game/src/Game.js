import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';


const Pong = () => {
  const gameRef = useRef(null);
  
  useEffect(() => {
  const config = {
    type: Phaser.AUTO,
    backgroundColor: '##2361a8',
    width: 800,
    height: 600,
    //   scale: {
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
    };
    
    const game = new Phaser.Game(config);
    
    gameRef.current = game;
    let ball;
    function preload() {
      // this.load.image('paddle', '../assets/images/red_paddle.png');
      // this.load.image("bg", "https://images.unsplash.com/photo-1474573892045-721452c3d98c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=8a1c8e04786fad38cae94ee48ce372e7")
      // this.load.image('ball', '../assets/images/paddle.png');
    }

    function create() {
        // ball = this.physics.add.sprite(this.physics.world.bounds.width / 2, this.physics.world.bounds.height / 2, "bg" );
      console.log("whats going on")
      
      
        this.ball = this.add.circle(200, 250, 10, 0xffffff, 1)
        this.physics.add.existing(this.ball)
        this.ball.body.setCircle(10)
        this.ball.body.setBounce(1, 1)
        this.ball.body.setMaxSpeed(400)

        this.paddleLeft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleLeft, true)
      
        this.paddleRight = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true)

        this.physics.add.collider(this.paddleLeft, this.ball, this.handlePaddleBallCollision, undefined, this)
		    this.physics.add.collider(this.paddleRight, this.ball, this.handlePaddleBallCollision, undefined, this)

      }


    function update() {

    }

      return () => {
        game.destroy(true);
      };

  }, []);

  return <div id="game-container"></div>;
};

export default Pong;
