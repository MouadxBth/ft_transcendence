"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";
import UserSelectionListItem from "./UserSelectionListItem";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { User } from "@/lib/types/user/user";
import useUsersAll from "@/hooks/user/useUsersAll";

export interface UserSelectionListProps {
	select: (value: string) => void;
	selected: string | undefined;
}

const UserSelectionList = ({ selected, select }: UserSelectionListProps) => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading, isError, error } = useUsersAll();
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) {
			setUsers(data.filter((user) => user.username !== authenticatedUser?.user.username));
		}
		setLoading(false);
	}, [data, authenticatedUser, isLoading, isError, error]);

	if (loading) return <div className="text-center">Loading...</div>;

	if (!users.length) return <div className="text-center">No users are currently available!</div>;

	return (
		<ScrollArea className=" w-full">
			<div className="w-full h-24 pr-3">
				{users.map((user) => (
					<UserSelectionListItem
						key={user.username}
						user={user}
						selected={selected}
						select={select}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default UserSelectionList;
