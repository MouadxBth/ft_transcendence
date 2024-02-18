"use client";
import GameMatchmaking from "@/components/game/components/GameMatchmaking/GameMatchmaking";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MatchmakingTitle from "@/components/game/components/GameMatchmaking/MatchmakingTitle";
import GameQueue from "@/components/game/components/GameQueue/GameQueue";
import { useEffect, useState } from "react";
import useSockets from "@/hooks/socket/useSockets";

const Game = () => {
	
	const [status, setStatus] = useState("choose");
	const [opponent, setOpponent] = useState("");

	return (
		<article className="flex justify-center items-center w-full h-full container flex-col space-y-3">
				{
					status === "choose" ? <GameMatchmaking setStatus={setStatus} setOpponent={setOpponent}/> :
					<GameQueue setStatus={setStatus} opponent={opponent}/>
				}
		</article>
	);
};

export default Game;
