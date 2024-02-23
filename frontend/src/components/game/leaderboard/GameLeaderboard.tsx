import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import useLeaderboard from "@/hooks/game/leaderboard/useLeaderboard";
import { LeaderboardMemberType } from "@/lib/types/game/leaderboard-member";
import React, { useEffect, useState } from "react";
import GameLeaderboardTitle from "./GameLeaderboardTitle";
import GameLeaderboardStats from "./GameLeaderboardStats";
import GameLeaderboardListSkeleton from "./list/skeleton/GameLeaderboardListSkeleton";
import GameLeaderboardList from "./list/GameLeaderboardList";

export interface GameLeaderboardProps {
	className?: string;
}

const GameLeaderboard = ({ className }: GameLeaderboardProps) => {
	const { data, isLoading, isSuccess, isError, error } = useLeaderboard();
	const [leaderboard, setLeaderboard] = useState<LeaderboardMemberType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setLeaderboard(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	return (
		<Card className={className}>
			<div className="flex flex-col space-y-2">
				<GameLeaderboardTitle />

				<GameLeaderboardStats />

				<CardContent>
					{loading ? (
						<GameLeaderboardListSkeleton />
					) : (
						<GameLeaderboardList members={leaderboard} />
					)}
				</CardContent>
			</div>
		</Card>
	);
};

export default GameLeaderboard;
