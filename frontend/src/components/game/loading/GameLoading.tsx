import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HorizontalSeparator from "@/components/ui/horizontal-separator";
import { GameRequestType } from "@/lib/types/game/game-request";
import GamePlayer from "../player/GamePlayer";
import { cn } from "@/lib/utils";
import GamePlayerLoading from "../player/GamePlayerLoading";

export interface GameLoadingProps {
	className?: string;
	game?: GameRequestType;
}

const GameLoading = ({ className, game }: GameLoadingProps) => {
	return (
		<Card className={cn("flex flex-col items-center justify-center", className)}>
			<CardHeader className="text-center">
				<CardTitle>Waiting</CardTitle>
				<CardDescription>Waiting for your opponent to your join...</CardDescription>
			</CardHeader>
			<CardContent className="w-full flex space-x-2 justify-center items-center">
				<GamePlayer player={game ? game.sender : undefined} />
				<HorizontalSeparator
					text="VS"
					className="w-1/3"
				/>
				{game ? (
					<GamePlayer
						player={game.target}
						loading
					/>
				) : (
					<GamePlayerLoading />
				)}
			</CardContent>
		</Card>
	);
};

export default GameLoading;
