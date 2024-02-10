import React from "react";
import ChatSidebarContent from "../sidebar/ChatSidebarContent";
import ChatSidebarContentList from "../sidebar/ChatSidebarContentList";
import ConversationTabList from "./list/ConversationTabList";
import { ConversationTabListItemProps } from "./list/ConversationTabListItem";

const random = Array.from({ length: 10 }).map((_, i, a) => {
	return {
		nickname: `nickname-${a.length - i}`,
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Hello, World",
		date: new Date(),
	} as ConversationTabListItemProps;
});

const ConversationTab = () => {
	return (
		<ChatSidebarContent value="conversations">
			<div className="">SEARCH FOR CONVERSATIONS</div>
			<ChatSidebarContentList>
				<ConversationTabList data={random} />
			</ChatSidebarContentList>
		</ChatSidebarContent>
	);
};

export default ConversationTab;
