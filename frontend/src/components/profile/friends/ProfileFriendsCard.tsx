"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProfileFriendsTitle from "./ProfileFriendsTitle";
import ProfileFriendsList from "./list/ProfileFriendsList";
import ProfileFriend from "./friend/ProfileFriend";
import ProfileFriendsStats from "./ProfileFriendsStats";
import { User } from "@/lib/types/user/user";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";
import useFriendsUpdate from "@/hooks/user/friends/useFriendsUpdate";
import { FriendType } from "@/lib/types/friend/friend";
import { useState, useEffect } from "react";
import ProfileFriendsListSkeleton from "./list/skeleton/ProfileFriendsListSkeleton";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export interface ProfileFriendsCardProps {
	user?: User;
}

const ProfileFriendsCard = ({ user }: ProfileFriendsCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(user?.username ?? null);
	const [friends, setFriends] = useState<FriendType[]>([]);
	const [loading, setLoading] = useState(true);

	useFriendsUpdate(setFriends, user?.username);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setFriends(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	return (
		<Card className=" relative">
			{user && user?.username !== authenticatedUser?.user.username && (
				<ProfileFriend
					user={user}
					className="absolute top-2 right-2 z-10"
				/>
			)}
			<div className="flex flex-col space-y-2">
				<ProfileFriendsTitle />

				<ProfileFriendsStats
					user={user}
					loading={loading}
					friends={friends}
				/>

				<CardContent>
					{loading ? (
						<ProfileFriendsListSkeleton />
					) : (
						<ProfileFriendsList
							user={user}
							friends={friends}
						/>
					)}
				</CardContent>
			</div>
		</Card>
	);
};

export default ProfileFriendsCard;
