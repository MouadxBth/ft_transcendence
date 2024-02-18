"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export interface ConversationTabSearchProps {
	setQuery: Dispatch<SetStateAction<string>>;
}

const ConversationTabSearch = ({ setQuery }: ConversationTabSearchProps) => {
	return (
		<Input
			type="text"
			placeholder="Search for a Conversation"
			onChange={(e) => {
				setQuery(e.target.value);
			}}
		/>
	);
};

export default ConversationTabSearch;
