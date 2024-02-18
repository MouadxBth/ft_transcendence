"use client";

import { useState } from "react";
import ChatSidebarContent from "../sidebar/ChatSidebarContent";
import ChatSidebarContentList from "../sidebar/ChatSidebarContentList";
import ChannelTabList from "./list/ChannelTabList";
import ChannelTabPlus from "./plus/ChannelTabPlus";
import ChannelTabSearch from "./search/ChannelTabSearch";

const ChannelTab = () => {
	const [query, setQuery] = useState("");

	return (
		<ChatSidebarContent value="channels">
			<div className="p-2 flex space-x-2 border-b">
				<ChannelTabSearch setQuery={setQuery} />
				<ChannelTabPlus />
			</div>
			<ChatSidebarContentList>
				<ChannelTabList query={query} />
			</ChatSidebarContentList>
		</ChatSidebarContent>
	);
};

export default ChannelTab;
