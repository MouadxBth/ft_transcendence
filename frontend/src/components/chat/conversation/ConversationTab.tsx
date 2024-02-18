"use client";

import { useState } from "react";
import ChatSidebarContent from "../sidebar/ChatSidebarContent";
import ChatSidebarContentList from "../sidebar/ChatSidebarContentList";
import ConversationTabSearch from "./search/ConversationTabSearch";
import ConversationTabPlus from "./plus/ConversationTabPlus";
import ConversationTabList from "./list/ConversationTabList";

const ConversationTab = () => {
	const [query, setQuery] = useState("");

	return (
		<ChatSidebarContent value="conversations">
			<div className="p-2 flex space-x-2 border-b">
				<ConversationTabSearch setQuery={setQuery} />
				<ConversationTabPlus />
			</div>
			<ChatSidebarContentList>
				<ConversationTabList query={query} />
			</ChatSidebarContentList>
		</ChatSidebarContent>
	);
};

export default ConversationTab;
