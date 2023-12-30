"use client";
import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";
import scoreScene from "./scoreScene";

let game: any;

const config: any = {
  type: Phaser.AUTO,
  backgroundColor: "#2361a8",
  width: 800,
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

function checkColor(color: any) {
  if (color === "black") return "#000000";
  else if (color === "green") return "#228b22";
  else return "#741b85";
}

function Pong(props: any) {
  useEffect(() => {
    config.backgroundColor = checkColor(props.color);
    game = new Phaser.Game(config);
    game.scene.add("GameScene", GameScene);
    game.scene.add("scoreScene", scoreScene);
    game.scene.start("GameScene");  
    game.scene.start("scoreScene");
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
}

export default Pong;
