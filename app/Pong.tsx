"use client";
import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
import scoreScene from "./scoreScene";
import ColorPicker from "./backGround";
import styles from './pong.module.css'; // Import your CSS module

let game: any;

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: "#2361a8",
  width: 800, //800
  height: 600,
  // scale: {
  //     mode: Phaser.Scale.RESIZE,
  //     autoCenter: Phaser.Scale.CENTER_BOTH
  // },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
    },
  },
};
//dont forget changing the scene 
function Pong() {
  useEffect(() => {
    game = new Phaser.Game(config);
    game.scene.add("GameScene", GameScene);
    game.scene.add("scoreScene", scoreScene);
    game.scene.start("GameScene", game);  
    game.scene.start("scoreScene");
    return () => {
      game.destroy(true);
    };
  }, []);

  return<div id="game-container" />
}

export default Pong;
