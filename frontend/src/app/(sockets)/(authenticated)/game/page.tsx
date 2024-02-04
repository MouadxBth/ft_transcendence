"use client";
import GameMatchmaking from "@/components/game/components/GameMatchmaking/GameMatchmaking";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import MatchmakingTitle from "@/components/game/components/GameMatchmaking/MatchmakingTitle";

const Game = () => {
	return (
		<main className="flex justify-center items-center w-full h-full">
			<Card className="max-w-3/4 max-h-3/4 flex flex-col items-center justify-center">
				<CardHeader>
					<CardTitle>
						<MatchmakingTitle />
					</CardTitle>
				</CardHeader>
				<CardContent className="">
					<p>
						<GameMatchmaking />
					</p>
				</CardContent>
			</Card>
		</main>
	);
};

export default Game;
