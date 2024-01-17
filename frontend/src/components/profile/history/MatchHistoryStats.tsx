import { User } from "@/lib/types/user";
import React from "react";
import { MatchHistoryListProps } from "./MatchHistoryList";
import { Crown, Ghost } from "lucide-react";
import { MatchHistoryType } from "@/lib/types/match-history";

export interface MatchHistoryStatsProps {
	user: User | null;
	data: MatchHistoryType[] | undefined;
}

const MatchHistoryStats = ({ user, data }: MatchHistoryStatsProps) => {
	return (
		<div className="text-sm text-muted-foreground">
			<div>{user ? `${user.nickname}'s` : "Your"} latest games</div>
			<div className="flex justify-between pt-2">
				<div className="flex space-x-1">
					<div>Won: {data?.filter((value) => value.won).length}</div>
					<Crown className="w-4 h-auto text-green-500" />
				</div>

				<div className="flex space-x-1">
					<div>Lost: {data?.filter((value) => !value.won).length}</div>
					<Ghost className="w-4 h-auto text-red-500" />
				</div>
			</div>
		</div>
	);
};

export default MatchHistoryStats;
