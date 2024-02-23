import { ScrollArea } from "@/components/ui/scroll-area";
import GameLeaderboardListItemSkeleton from "./GameLeaderboardListItemSkeleton";

const random = Array.from({ length: 10 }, (_, index) => index + 1);

const GameLeaderboardListSkeleton = () => {
	return (
		<ScrollArea className="w-full">
			<div className="p-2 max-h-32 text-center">
				{random.map((element) => {
					return <GameLeaderboardListItemSkeleton key={element} />;
				})}
			</div>
		</ScrollArea>
	);
};

export default GameLeaderboardListSkeleton;
