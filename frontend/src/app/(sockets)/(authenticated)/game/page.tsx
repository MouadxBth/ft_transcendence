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
		<article className="flex justify-center items-center w-full h-full container flex-col space-y-3">
			<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
				<CardHeader>
					<CardTitle>
						<MatchmakingTitle />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<GameMatchmaking />
				</CardContent>
			</Card>
		</article>
	);
};

export default Game;
