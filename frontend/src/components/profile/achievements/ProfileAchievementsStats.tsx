"use client";

import { CardDescription } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { AchievementType } from "@/lib/types/achievement/achievement";
import { User } from "@/lib/types/user/user";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

export interface ProfileAchievementsStatsProps {
	user?: User;
	className?: string;
	loading: boolean;
	achievements: AchievementType[];
}

const ProfileAchievementsStats = ({
	user,
	loading,
	achievements,
	className,
}: ProfileAchievementsStatsProps) => {
	const { authenticatedUser } = useAuthentication();
	const { nickname } = user ?? authenticatedUser?.user!;

	return (
		<div className={cn("flex flex-col space-y-2 px-6", className)}>
			<CardDescription>
				<span>{user ? `${nickname}'s` : "Your"} latest achievements</span>
			</CardDescription>
			<div className="flex space-x-1">
				<div>Unlocked: {loading ? "..." : achievements.length}</div>
				<Trophy className="w-4 h-auto text-green-500" />
			</div>
		</div>
	);
};

export default ProfileAchievementsStats;
