"use client";

import { FriendsContext } from "@/contexts/FriendsContext";
import { FriendType } from "@/lib/types/friend";
import { useEffect, useState } from "react";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";

export interface FriendsContextProviderProps {
	children: React.ReactNode;
	username?: string;
}

const FriendsContextProvider = ({ children, username }: FriendsContextProviderProps) => {
	const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(username ?? null);
	const [friends, setFriends] = useState<FriendType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setFriends(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);

	return (
		<FriendsContext.Provider
			value={{
				friends,
				setFriends,
				isLoading: loading,
				isError,
				error,
			}}
		>
			{children}
		</FriendsContext.Provider>
	);
};

export default FriendsContextProvider;
