"use client";

import { Card, CardHeader, CardTitle } from "../../ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import ProfileAchievementsStats from "./ProfileAchievementsStats";
import ProfileAchievementsList from "./list/ProfileAchievementsList";
import { User } from "@/lib/types/user/user";
import useAchievementsFetch from "@/hooks/user/achievements/useAchievementsFetch";
import useAchievementsUpdate from "@/hooks/user/achievements/useAchievementsUpdate";
import { AchievementType } from "@/lib/types/achievement/achievement";
import { useState, useEffect } from "react";

export interface ProfileAchievementsCardProps {
	user?: User;
}

const ProfileAchievementsCard = ({ user }: ProfileAchievementsCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser: User = user ?? authenticatedUser?.user!;

	const { data, isLoading, isSuccess, isError, error } = useAchievementsFetch(currentUser.username);
	const [achievements, setAchievements] = useState<AchievementType[]>([]);
	const [loading, setLoading] = useState(true);

	useAchievementsUpdate(setAchievements, currentUser.username);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setAchievements(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	return (
		<Card className="flex flex-col space-y-1">
			<CardHeader className="p-0 py-3 px-6">
				<CardTitle>Achievements</CardTitle>
			</CardHeader>

			<ProfileAchievementsStats
				user={user}
				loading={loading}
				achievements={achievements}
			/>

			<ProfileAchievementsList
				user={currentUser}
				loading={loading}
				achievements={achievements}
			/>
		</Card>
	);
};

export default ProfileAchievementsCard;
