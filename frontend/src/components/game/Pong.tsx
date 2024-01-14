"use client";

import React, { useEffect, useRef } from "react";

import { Game } from "phaser";
import { PreloadSceneKey, TitleSceneKey } from "./consts/SceneKeys";

const Pong = () => {
	const gameRef = useRef<Game>();

	useEffect(() => {
		const initPhaser = async () => {
			try {
				const Phaser = await import("phaser");
				const { Preload } = await import("./scenes/Preload");
				const { TitleScene } = await import("./scenes/TitleScene");

				if (gameRef.current !== undefined) return;

				const config = {
					type: Phaser.AUTO,
					parent: "phaser-game",
					backgroundColor: "#FF0000",
					scale: {
						width: 800,
						height: 600,
					},
					physics: {
						default: "arcade",
					},
					fps: {
						target: 60,
						forceSetTimeOut: true,
					},
				};

				gameRef.current = new Phaser.Game(config);

				gameRef.current.scene.add(TitleSceneKey, TitleScene);
				gameRef.current.scene.add(PreloadSceneKey, Preload);

				gameRef.current.scene.start(PreloadSceneKey);
			} catch (error: any) {
				console.log(error);
			}
		};

		initPhaser();
	}, []);

	return <div id="phaser-game"></div>;
};

export default Pong;
