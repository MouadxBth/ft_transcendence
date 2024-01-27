"use client";
import GameMatchmaking from "@/components/game/components/GameMatchmaking/GameMatchmaking";
import { Tabs } from "@/components/ui/tabs";

const Game = () => {
	return (
		<main className="flex justify-center items-center w-full h-full">
			<Tabs
				defaultValue="auto matchmaking"
				className="w-1/2 h-1/2 border flex flex-col items-center"
			>
				<GameMatchmaking />
			</Tabs>
		</main>
	);
};

export default Game;
