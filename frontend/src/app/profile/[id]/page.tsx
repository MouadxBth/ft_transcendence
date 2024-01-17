"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import FriendsCard from "@/components/profile/friends/FriendsCard";
import Loading from "@/components/ui/loading";

import useProfile from "@/hooks/useProfile";
import { notFound } from "next/navigation";
import React from "react";

const ProfilePage = ({ params }: { params: { id: string } }) => {
	const { data, isLoading, isError, error } = useProfile(params.id);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		console.log("NOT FOUND ", data, isLoading);
		return notFound();
	}

	return (
		<main className="grid grid-cols-2 gap-2 p-2 max-sm:grid-cols-1 ">
			<article className=" col-span-2 max-sm:col-span-1">
				<ProfileCard user={data ?? null} />
			</article>
			<article>{/* <MatchHistoryCard /> */}</article>
			<article>{/* <AchievementsCard /> */}</article>
			<article className="col-span-2 max-sm:col-span-1">
				<FriendsCard user={data} />
			</article>
		</main>
	);
};

export default ProfilePage;
