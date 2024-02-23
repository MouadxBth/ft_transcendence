"use client";

import { User } from "@/lib/types/user/user";
import ProfileHistoryListItem from "./ProfileHistoryListItem";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { GameMatchType } from "@/lib/types/game/game-match";

export interface ProfileHistoryListProps {
	user?: User;
	className?: string;
	loading: boolean;
	matches: GameMatchType[];
}

const ProfileHistoryList = ({ user, loading, matches, className }: ProfileHistoryListProps) => {
	const { authenticatedUser } = useAuthentication();

	const { username, nickname } = user ?? authenticatedUser?.user!;
	const myProfile = username === authenticatedUser?.user.username;

	const emptyMessage = myProfile
		? "You haven't played any matches yet!"
		: `${nickname} hasn't played any matches yet`;

	if (loading) return <div>loading..</div>;

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="border">
				<div className="h-48 text-center">
					{!matches || !matches.length
						? emptyMessage
						: matches.map((match) => (
								<ProfileHistoryListItem
									key={match.id}
									match={match}
								/>
							))}
				</div>
			</ScrollArea>
		</CardContent>
	);
};

export default ProfileHistoryList;
