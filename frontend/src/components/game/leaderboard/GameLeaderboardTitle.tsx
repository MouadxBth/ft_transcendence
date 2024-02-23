import { CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface GameLeaderboardTitleProps {
	className?: string;
}

const GameLeaderboardTitle = ({ className }: GameLeaderboardTitleProps) => {
	return (
		<CardHeader className={cn("p-0 py-3 px-6", className)}>
			<CardTitle className="flex justify-between items-center relative">
				<div>Leaderboard</div>
			</CardTitle>
		</CardHeader>
	);
};

export default GameLeaderboardTitle;
