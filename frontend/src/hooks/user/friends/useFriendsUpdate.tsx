import { Dispatch, SetStateAction, useEffect } from "react";
import useSockets from "../../socket/useSockets";
import { FriendsUpdateType } from "@/lib/types/friend/friends-update";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { FriendType } from "@/lib/types/friend/friend";

const useFriendsUpdate = (
	setFriends: Dispatch<SetStateAction<FriendType[]>>,
	username?: string
) => {
	const { authenticatedUser } = useAuthentication();
	const { notifications } = useSockets();
	const target = username ?? authenticatedUser?.user.username!;

	useEffect(() => {
		notifications?.on("friends_updated", (args: FriendsUpdateType) => {
			if (target === args.username) {
				setFriends(args.friends);
			}
		});
	}, [notifications, target, authenticatedUser, setFriends]);
};

export default useFriendsUpdate;
