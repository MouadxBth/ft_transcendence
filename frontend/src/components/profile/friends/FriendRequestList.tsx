import { FriendType } from "@/lib/types/friend";
import FriendRequestListItem from "./FriendRequestListItem";

export interface FriendRequestListProps {
	data: FriendType[] | undefined;
}

const FriendRequestList = ({ data }: FriendRequestListProps) => {
	return (
		<div className="p-4 max-h-32 text-center">
			{!data || !data.length
				? "You don't have any friend requests!"
				: data.map(({ nickname, avatar }) => (
						<FriendRequestListItem
							key={nickname}
							nickname={nickname}
							avatar={avatar}
						/>
				  ))}
		</div>
	);
};

export default FriendRequestList;
