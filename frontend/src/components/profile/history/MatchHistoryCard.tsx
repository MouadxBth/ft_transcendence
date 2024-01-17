"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import { ScrollArea } from "../../ui/scroll-area";
import { Loader2 } from "lucide-react";
import MatchHistoryList from "./MatchHistoryList";
import { User } from "@/lib/types/user";
import useMatchHistory from "@/hooks/useMatchHistory";
import MatchHistoryStats from "./MatchHistoryStats";

// const tags = Array.from({ length: 10 }).map((_, i, a) => {
// 	return {
// 		nickname: `friend-${i}`,
// 		avatar: "https://github.com/shadcn.png",
// 	};
// });

const MatchHistoryCard = (user: User | null) => {
	const { data, isLoading, isError, error } = useMatchHistory(user ? user.username : null);

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
				<CardTitle>Match History</CardTitle>
				<MatchHistoryStats
					user={user}
					data={data}
				/>
			</CardHeader>

			<CardContent>
				<ScrollArea className="border">
					<MatchHistoryList data={data} />
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

export default MatchHistoryCard;
