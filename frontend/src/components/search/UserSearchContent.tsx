"use client";

import useDebounce from "@/hooks/useDebounce";
import { ScrollArea } from "../ui/scroll-area";
import UserSearchList from "./UserSearchList";
import useUserSearch from "@/hooks/user/useUserSearch";

export interface UserSearchContentProps {
	query: string;
}

const UserSearchContent = ({ query }: UserSearchContentProps) => {
	const searchQuery = useDebounce(query, 500);

	const { data, isLoading } = useUserSearch(searchQuery);

	if (isLoading) return <div>Loading...</div>;

	if (!data) return <div>No results</div>;

	return (
		<ScrollArea className="border w-full">
			<UserSearchList data={data} />
		</ScrollArea>
	);
};

export default UserSearchContent;
