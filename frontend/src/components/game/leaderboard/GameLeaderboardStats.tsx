"use client";

import { CardDescription } from "@/components/ui/card";
import useLeaderboardStats from "@/hooks/game/leaderboard/useLeaderboardStats";
import { LeaderboardMemberType } from "@/lib/types/game/leaderboard-member";
import { cn, getRankColor } from "@/lib/utils";
import { Award, Medal, Scroll } from "lucide-react";
import { useEffect, useState } from "react";

export interface GameLeaderboardStatsProps {
	className?: string;
}

const GameLeaderboardStats = ({ className }: GameLeaderboardStatsProps) => {
	const { data, isLoading, isSuccess, isError, error } = useLeaderboardStats();
	const [stats, setStats] = useState<LeaderboardMemberType | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setStats(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={cn("px-6 flex flex-col space-y-2", className)}>
			<CardDescription className="flex space-x-2">
				<span className="flex space-x-2">
					<span>Your rating:</span>
					<span className="flex items-center space-x-2">
						<span className="text-white">{stats?.eloRating}</span>
						<span className="text-white">
							<Scroll />
						</span>
					</span>
				</span>
				<span className="flex space-x-2">
					<span>Your ranking:</span>
					<span className="flex items-center space-x-2">
						<span className="text-white">{stats?.rank}</span>
						<span className={`${getRankColor((stats?.rank ?? 1) - 1)}`}>
							<Medal />
						</span>
					</span>
				</span>
			</CardDescription>
		</div>
	);
};

export default GameLeaderboardStats;
