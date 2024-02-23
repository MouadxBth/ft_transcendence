"use client";

import { CardDescription } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { GameMatchType } from "@/lib/types/game/game-match";
import { User } from "@/lib/types/user/user";
import { cn } from "@/lib/utils";

export interface ProfileHistoryStatsProps {
	user?: User;
	className?: string;
	loading: boolean;
	matches: GameMatchType[];
}

const ProfileHistoryStats = ({ user, loading, matches, className }: ProfileHistoryStatsProps) => {
	const { authenticatedUser } = useAuthentication();
	const { nickname } = user ?? authenticatedUser?.user!;

	return (
		<div className={cn("flex flex-col space-y-2 px-6", className)}>
			<CardDescription>
				<span>{user ? `${nickname}'s` : "Your"} latest matches</span>
			</CardDescription>
			<div className="flex space-x-1">
				<div>Played: {loading ? "..." : matches.length}</div>
				{/* <Trophy className="w-4 h-auto text-green-500" /> */}
			</div>
		</div>
	);
};

export default ProfileHistoryStats;
