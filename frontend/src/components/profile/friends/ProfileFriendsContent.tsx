"use client";

import { CardContent } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import ProfileFriendsList from "./list/ProfileFriendsList";
import { useEffect, useState } from "react";
import { FriendType } from "@/lib/types/friend";
import useFriends from "@/hooks/user/useFriends";
import ProfileFriendsListSkeleton from "./list/skeleton/ProfileFriendsListSkeleton";
import useFriendsUpdate from "@/hooks/user/useFriendsUpdate";

export interface ProfileFriendsContentProps {
	user?: User;
	className?: string;
}

const ProfileFriendsContent = ({ user, className }: ProfileFriendsContentProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser = user ?? authenticatedUser?.user!;
	const myProfile = currentUser.username === authenticatedUser?.user.username;
	const { data, isLoading } = useFriends(currentUser.username);
	const [friends, setFriends] = useState<FriendType[]>([]);
	const [loading, setLoading] = useState(true);

	useFriendsUpdate(currentUser, setFriends);

	useEffect(() => {
		if (isLoading || !data) return;

		setFriends(data!);
		setLoading(false);
	}, [isLoading, data]);

	return (
		<CardContent className={cn(className)}>
			{loading ? (
				<ProfileFriendsListSkeleton />
			) : (
				<ProfileFriendsList
					user={currentUser}
					myProfile={myProfile}
					friends={friends}
				/>
			)}
		</CardContent>
	);
};

export default ProfileFriendsContent;
