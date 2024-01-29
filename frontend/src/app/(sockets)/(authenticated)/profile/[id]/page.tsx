"use client";

import ProfileAchievementsCard from "@/components/profile/achievements/ProfileAchievementsCard";
import ProfileFriendsCard from "@/components/profile/friends/ProfileFriendsCard";
import ProfileInfoCard from "@/components/profile/info/ProfileInfoCard";
import ProfileInfoCardSkeleton from "@/components/profile/info/skeleton/ProfileInfoCardSkeleton";
import useProfile from "@/hooks/user/useProfile";
import { User } from "@/lib/types/user/user";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
	const { data, isLoading } = useProfile(params.id);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (isLoading) return;

		if (!data) return notFound();

		setUser(data);
		setLoading(false);
	}, [isLoading, data]);

	return (
		<article className="h-full flex flex-col space-y-2">
			{loading ? <ProfileInfoCardSkeleton /> : <ProfileInfoCard user={user!} />}
			<div className="grid grid-cols-2 gap-2">
				{!loading && <ProfileAchievementsCard user={user!} />}
				{!loading && <ProfileFriendsCard user={user!} />}
			</div>
		</article>
	);
};

export default ProfilePage;
