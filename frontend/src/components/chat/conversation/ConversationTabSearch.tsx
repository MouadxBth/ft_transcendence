"use client";

import { useRef } from "react";
import { Input } from "../../ui/input";
import { ConversationTabListItemProps } from "./ConversationTabListItem";

export interface ConversationTabSearchProps {
	all: ConversationTabListItemProps[];
	setAll: React.Dispatch<React.SetStateAction<ConversationTabListItemProps[]>>;
}

const ConversationTabSearch = ({ all, setAll }: ConversationTabSearchProps) => {
	const ref = useRef<ConversationTabListItemProps[]>(all);
	return (
		<Input
			type="text"
			placeholder="Search for a Conversation"
			onChange={(e) =>
				setAll(ref.current.filter((value) => value.nickname.startsWith(e.target.value)))
			}
		/>
	);
};

export default ConversationTabSearch;
