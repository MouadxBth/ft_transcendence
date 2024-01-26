import { User } from "@/lib/types/user";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileFriendsListItem from "./ProfileFriendsListItem";
import { FriendType } from "@/lib/types/friend";

export interface ProfileFriendsListProps {
	user: User;
	friends?: FriendType[];
	myProfile: boolean;
}

const ProfileFriendsList = ({ user, friends, myProfile }: ProfileFriendsListProps) => {
	const emptyMessage = myProfile
		? "You don't have any friends yet!"
		: `${user.nickname} doesn't have any friends yet, be the first and send him a request!`;
	return (
		<ScrollArea className="w-full border">
			<div className="max-h-32 w-full">
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
