import { FriendType } from "@/lib/types/friend";
import FriendListItem from "./FriendListItem";
import { User } from "@/lib/types/user";

export interface FriendListProps {
	user: User;
	data: FriendType[] | undefined;
	forAuthenticatedUser: boolean;
}

const FriendList = ({ user, data, forAuthenticatedUser }: FriendListProps) => {
	return (
		<div className="p-4 max-h-32 text-center">
			{!data || !data.length
				? !forAuthenticatedUser
					? "You don't have any friends yet!"
					: `${user.nickname} doesn't have any friends yet, be the first and send him a request!`
				: data.map(({ nickname, avatar }) => (
						<FriendListItem
							key={nickname}
							nickname={nickname}
							avatar={avatar}
						/>
				  ))}
		</div>
	);
};

export default FriendList;
