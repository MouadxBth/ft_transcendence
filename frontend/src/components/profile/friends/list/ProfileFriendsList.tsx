"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileFriendsListItem from "./ProfileFriendsListItem";
import { FriendType } from "@/lib/types/friend/friend";
import { User } from "@/lib/types/user/user";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export interface ProfileFriendsListProps {
	user?: User;
	friends?: FriendType[];
}

const ProfileFriendsList = ({ user, friends }: ProfileFriendsListProps) => {
	const { authenticatedUser } = useAuthentication();
	const { username, nickname } = user ?? authenticatedUser?.user!;
	const myProfile = username === authenticatedUser?.user.username;

	const emptyMessage = myProfile
		? "You don't have any friends yet!"
		: `${nickname} doesn't have any friends yet, be the first and send him a request!`;
	return (
		<ScrollArea className="w-full border">
			<div className="h-32 text-center w-full">
				{!friends || !friends.length
					? emptyMessage
					: friends.map((friend) => (
							<ProfileFriendsListItem
								key={friend.nickname}
								{...friend}
							/>
						))}
			</div>
		</ScrollArea>
	);
};

export default ProfileFriendsList;
