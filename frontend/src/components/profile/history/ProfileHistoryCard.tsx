"use client";

import { Card, CardHeader, CardTitle } from "../../ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { User } from "@/lib/types/user/user";
import { useState, useEffect } from "react";
import ProfileHistoryStats from "./ProfileHistoryStats";
import ProfileHistoryList from "./list/ProfileHistoryList";
import { GameMatchType } from "@/lib/types/game/game-match";
import useMatchHistory from "@/hooks/game/history/useMatchHistory";
import { cn } from "@/lib/utils";

export interface ProfileHistoryCardProps {
	user?: User;
	className?: string;
}

const ProfileHistoryCard = ({ user, className }: ProfileHistoryCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser: User = user ?? authenticatedUser?.user!;

	const { data, isLoading, isSuccess, isError, error } = useMatchHistory(currentUser.username);
	const [matches, setMatches] = useState<GameMatchType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setMatches(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	return (
		<Card className={cn("flex flex-col space-y-1", className)}>
			<CardHeader className="p-0 py-3 px-6">
				<CardTitle>Match History</CardTitle>
			</CardHeader>

			<ProfileHistoryStats
				user={user}
				loading={loading}
				matches={matches}
			/>

			<ProfileHistoryList
				user={currentUser}
				loading={loading}
				matches={matches}
			/>
		</Card>
	);
};

export default ProfileHistoryCard;
