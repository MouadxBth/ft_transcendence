"use client";

import React, { useEffect, useRef } from "react";

import { Game } from "phaser";
import {
	PreloadSceneKey,
	TitleSceneKey,
	GameSceneKey,
	GameBackgroundSceneKey,
	GameOverSceneKey,
} from "./consts/SceneKeys";
import useGame from "@/hooks/game/useGame";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { GameMatchType } from "@/lib/types/game/game-match";
import { GameData } from "@/lib/types/game/game-data";
import { GameRequestType } from "@/lib/types/game/game-request";

export interface PongProps {
	className?: string;
	match: GameMatchType;
}

const Pong = ({ className, match }: PongProps) => {
	const gameRef = useRef<Game>();
	const context = useGame();
	const { authenticatedUser } = useAuthentication();

	useEffect(() => {
		const initPhaser = async () => {
			try {
				const Phaser = await import("phaser");
				const { Preload } = await import("./scenes/Preload");
				const { TitleScene } = await import("./scenes/TitleScene");
				const { GameScene } = await import("./scenes/GameScene");
				const { GameBackground } = await import("./scenes/GameBackground");
				const { GameOver } = await import("./scenes/GameOver");

				if (gameRef.current !== undefined) return;

				const config = {
					type: Phaser.AUTO,
					parent: "phaser-game",
					scale: {
						mode: Phaser.Scale.FIT,
						autoCenter: Phaser.Scale.CENTER_BOTH,
					},
					physics: {
						default: "arcade",
					},
					fps: {
						min: 60,
						target: 60,
						deltaHistory: 10,
						smoothStep: true,
						forceSetTimeOut: true,
					},
					audio: {
						noAudio: true,
						disableWebAudio: true,
					},
					banner: false,
					disableContextMenu: true,
				};

				gameRef.current = new Phaser.Game(config);

				gameRef.current.scene.add(TitleSceneKey, TitleScene);
				gameRef.current.scene.add(PreloadSceneKey, Preload);
				gameRef.current.scene.add(GameSceneKey, GameScene);
				gameRef.current.scene.add(GameBackgroundSceneKey, GameBackground);
				gameRef.current.scene.add(GameOverSceneKey, GameOver);

				gameRef.current.scene.start(PreloadSceneKey, {
					context,
					authenticatedUser,
					match,
				} satisfies GameData);
			} catch (error: any) {
				console.error(error);
			}
		};

		initPhaser();
	}, [context, authenticatedUser, match]);

	return (
		<div
			id="phaser-game"
			className={className}
		></div>
	);
};

export default Pong;
