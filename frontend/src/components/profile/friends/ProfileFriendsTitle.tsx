"use client";

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { User } from "@/lib/types/user";
import { cn } from "@/lib/utils";
import ProfileFriend from "./friend/ProfileFriend";

export interface ProfileFriendsTitleProps {
	user?: User;
	className?: string;
}

const ProfileFriendsTitle = ({ user, className }: ProfileFriendsTitleProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser = user ?? authenticatedUser?.user!;
	const myProfile = currentUser.username === authenticatedUser?.user.username;

	return (
		<CardHeader className={cn(className)}>
			<CardTitle className="flex justify-between items-center relative">
				<div>Friends</div>

				{!myProfile && <ProfileFriend user={currentUser} />}
			</CardTitle>
			<CardDescription>{`${myProfile ? "Your" : `${currentUser.nickname}'s`} friends`}</CardDescription>
		</CardHeader>
	);
};

export default ProfileFriendsTitle;
