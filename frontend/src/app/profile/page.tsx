"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import FriendsCard from "@/components/profile/friends/FriendsCard";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import React from "react";

const ProfilePage = () => {
	const { authenticatedUser } = useAuthentication();

	if (!authenticatedUser) return null;

	return (
		<main className="grid grid-cols-2 gap-2 p-2 max-sm:grid-cols-1 ">
			<article className=" col-span-2 max-sm:col-span-1">
				<ProfileCard user={authenticatedUser.user} />
			</article>
			<article>{/* <MatchHistoryCard /> */}</article>
			<article>{/* <AchievementsCard /> */}</article>
			<article className="col-span-2 max-sm:col-span-1">
				<FriendsCard user={authenticatedUser.user ?? null} />
			</article>
		</main>
	);
};

export default ProfilePage;
