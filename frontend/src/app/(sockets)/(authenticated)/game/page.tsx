"use client";

import Pong from "@/components/game/Pong";
import GameLoading from "@/components/game/loading/GameLoading";
import GameLobby from "@/components/game/lobby/GameLobby";
import useGameRequestUpdate from "@/hooks/game/update/useGameRequestUpdate";
import useGameNotifications from "@/hooks/notifications/useGameNotifications";
import { GameMatchType } from "@/lib/types/game/game-match";
import { GamePlayerStatus } from "@/lib/types/game/game-match-player";
import { GameRequestType } from "@/lib/types/game/game-request";
import { useState } from "react";

const GamePage = () => {
	const [game, setGame] = useState<GameMatchType | undefined>(undefined);
	const [request, setRequest] = useState<GameRequestType | undefined>(undefined);
	const [status, setStatus] = useState<GamePlayerStatus>("lobby");

	useGameRequestUpdate(setStatus, setGame, setRequest);
	useGameNotifications();

	return (
		<article className="h-full w-full container grid grid-cols-2 gap-2 py-2">
			{status === "lobby" && <GameLobby />}
			{status === "waiting" && (
				<GameLoading
					game={request}
					className="col-span-2"
				/>
			)}
			{status === "started" && (
				<Pong
					className="col-span-2"
					match={game!}
				/>
			)}

			{/* <GameOptionsForm /> */}
		</article>
	);
};

export default GamePage;
