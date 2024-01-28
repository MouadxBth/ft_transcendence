"use client";
import GameMatchmaking from "@/components/game/components/GameMatchmaking/GameMatchmaking";

const Game = () => {
	return (
		<main className="flex justify-center items-center w-full h-full">
			<div
				defaultValue="auto matchmaking"
				className="w-1/2 h-1/2 border flex flex-col items-center"
			>
				<GameMatchmaking />
			</div>
		</main>
	);
};

export default Game;
