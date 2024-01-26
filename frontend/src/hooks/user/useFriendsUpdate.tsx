import { Dispatch, SetStateAction, useEffect } from "react";
import useSockets from "../socket/useSockets";
import { FriendType } from "@/lib/types/friend";
import { User } from "@/lib/types/user";
import { FriendsUpdateType } from "@/lib/types/friends-update";

const useFriendsUpdate = (user: User, setFriends: Dispatch<SetStateAction<FriendType[]>>) => {
	const { notifications } = useSockets();

	useEffect(() => {
		notifications?.on("friends_updated", (args: FriendsUpdateType) => {
			if (user.username === args.username) setFriends(args.friends);
		});
	}, [notifications, setFriends, user]);
};

export default useFriendsUpdate;
