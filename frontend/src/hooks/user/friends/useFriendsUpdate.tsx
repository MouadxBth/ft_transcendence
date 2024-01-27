import { Dispatch, SetStateAction, useEffect } from "react";
import useSockets from "../../socket/useSockets";
import { FriendType } from "@/lib/types/friend";
import { User } from "@/lib/types/user";
import { FriendsUpdateType } from "@/lib/types/friends-update";
import { useFriends } from "./useFriends";

const useFriendsUpdate = (user: User) => {
	const { notifications } = useSockets();
	const { setFriends } = useFriends();

	useEffect(() => {
		notifications?.on("friends_updated", (args: FriendsUpdateType) => {
			if (user.username === args.username) setFriends(args.friends);
		});
	}, [notifications, setFriends, user]);
};

export default useFriendsUpdate;
