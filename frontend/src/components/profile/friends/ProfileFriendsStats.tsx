"use client";

import { CardDescription } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { FriendType } from "@/lib/types/friend/friend";
import { User } from "@/lib/types/user/user";
import { cn } from "@/lib/utils";
import { UserRound } from "lucide-react";

export interface ProfileFriendsStatsProps {
	className?: string;
	user?: User;
	loading: boolean;
	friends: FriendType[];
}

const ProfileFriendsStats = ({ className, user, loading, friends }: ProfileFriendsStatsProps) => {
	const { authenticatedUser } = useAuthentication();

	const { username, nickname } = user ?? authenticatedUser?.user!;
	const myProfile = username === authenticatedUser?.user.username;

	return (
		<div className="px-6 flex flex-col space-y-2">
			<CardDescription>
				<span>{`${myProfile ? "Your" : `${nickname}'s`} friends`}</span>
			</CardDescription>
			<div className={cn("flex space-x-1", className)}>
				<div>Friends: {loading ? "..." : friends.length}</div>
				<UserRound className="w-4 h-auto text-amber-500" />
			</div>
		</div>
	);
};

export default ProfileFriendsStats;
