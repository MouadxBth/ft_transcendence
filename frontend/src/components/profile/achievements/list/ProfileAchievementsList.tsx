"use client";

import { User } from "@/lib/types/user/user";
import ProfileAchievementsListItem from "./ProfileAchievementsListItem";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import ProfileAchievementsListSkeleton from "../skeleton/ProfileAchievementsListSkeleton";
import { AchievementType } from "@/lib/types/achievement/achievement";

export interface ProfileAchievementsListProps {
	user?: User;
	className?: string;
	loading: boolean;
	achievements: AchievementType[];
}

const ProfileAchievementsList = ({
	user,
	loading,
	achievements,
	className,
}: ProfileAchievementsListProps) => {
	const { authenticatedUser } = useAuthentication();

	const { username, nickname } = user ?? authenticatedUser?.user!;
	const myProfile = username === authenticatedUser?.user.username;

	const emptyMessage = myProfile
		? "You don't have any achievements yet!"
		: `${nickname} doesn't have any achievements yet`;

	if (loading) return <ProfileAchievementsListSkeleton />;

	return (
		<CardContent className={cn(className)}>
			<ScrollArea className="border">
				<div className="h-32 text-center">
					{!achievements || !achievements.length
						? emptyMessage
						: achievements.map(({ name, brief, description, unlockedAt }) => (
								<ProfileAchievementsListItem
									key={name}
									name={name}
									brief={brief}
									description={description}
									unlockedAt={unlockedAt}
								/>
							))}
				</div>
			</ScrollArea>
		</CardContent>
	);
};

export default ProfileAchievementsList;
