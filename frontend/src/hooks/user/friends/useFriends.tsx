import { FriendsContext } from "@/contexts/FriendsContext";
import { useContext } from "react";

export const useFriends = () => {
	const context = useContext(FriendsContext);

	if (!context) throw new Error(`useFriends hook must be used inside an FriendsContextProvider`);

	return context;
};
