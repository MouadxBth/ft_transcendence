"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import AchievementStats from "./AchievementStats";
import AchievementList from "./AchievementList";
import useAchievements from "@/hooks/useAchievements";
import { Loader2 } from "lucide-react";
import { User } from "@/lib/types/user";

const AchievementsCard = (user: User | null) => {
	const { data, isLoading, isError, error } = useAchievements(user ? user.username : null);

	if (isLoading) {
		return (
			<div className="flex justify-center">
				<Loader2 className="h-4 w-auto animate-spin" />
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Achievements</CardTitle>
				<div className="text-sm text-muted-foreground">
					<span>{user ? `${user.nickname}'s` : "Your"} latest achievements</span>
					<AchievementStats unlocked={data?.length || 0} />
				</div>
			</CardHeader>

			<CardContent>
				<ScrollArea className="border">
					<AchievementList data={data} />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default AchievementsCard;
