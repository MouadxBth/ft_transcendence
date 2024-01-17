"use client";

import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { UserSearchListItemProps } from "./UserSearchListItem";
import { ScrollArea } from "../ui/scroll-area";
import UserSearchList from "./UserSearchList";

const schema = z.object({
	id: z.number(),
	title: z.string(),
});

export interface UserSearchContentProps {
	query: string;
}

const fetchData = async (query: string) => {
	const result = await axios
		.get("https://jsonplaceholder.typicode.com/todos")
		.then((value) => {
			console.log(value);
			return z.array(schema).parse(value.data);
		})
		.then((array) => array.filter((value) => value.title.toLowerCase().startsWith(query)))
		.then((array) =>
			array.map((value) => {
				return {
					nickname: `${value.title.length > 10 ? value.title.slice(0, 10) : value.title}-${
						value.id
					}`,
					avatar: `https://robohash.org/${value.id}`,
				} as UserSearchListItemProps;
			})
		);
	console.log("CALLED!!");
	return result;
};

const UserSearchContent = ({ query }: UserSearchContentProps) => {
	const searchQuery = useDebounce(query, 500);

	const { data, isLoading, error } = useQuery({
		queryKey: ["user-search", searchQuery],
		queryFn: () => fetchData(searchQuery),
		enabled: !!searchQuery,
	});

	if (isLoading) return <div>Loading...</div>;

	if (!data) return <div>No results</div>;

	return (
		<ScrollArea className="border w-full">
			<UserSearchList data={data} />
		</ScrollArea>
	);
};

export default UserSearchContent;
