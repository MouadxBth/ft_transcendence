import { AuthenticatedUser } from "@/lib/types/authenticated-user";
import { FriendType } from "@/lib/types/friend";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

interface FriendsContextType {
	friends: FriendType[];
	setFriends: Dispatch<SetStateAction<FriendType[]>>;
	isLoading: Boolean;
	isError: Boolean;
	error: Error | null;
}

export const FriendsContext = createContext<FriendsContextType>({
	friends: [],
	setFriends: () => {},
	isLoading: false,
	isError: false,
	error: null,
});
