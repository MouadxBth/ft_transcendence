"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { LeaderboardMemberType } from "@/lib/types/game/leaderboard-member";
import GameLeaderboardListItem from "./GameLeaderboardListItem";

export interface GameLeaderboardListProps {
	members?: LeaderboardMemberType[];
}

const GameLeaderboardList = ({ members }: GameLeaderboardListProps) => {
	return (
		<ScrollArea className="w-full border">
			<div className="h-60 text-center w-full">
				{!members || !members.length
					? "Leaderboard is currently empty!"
					: members.map((member, index) => (
							<GameLeaderboardListItem
								key={member.nickname}
								{...member}
								index={index}
							/>
						))}
			</div>
		</ScrollArea>
	);
};

export default GameLeaderboardList;
