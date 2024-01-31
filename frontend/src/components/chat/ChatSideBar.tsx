"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ConversationTab from "./conversation/ConversationTab";
import { ConversationTabListItemProps } from "./conversation/ConversationTabListItem";
import ChannelTab from "./channel/ChannelTab";

const random = Array.from({ length: 50 }).map((_, i, a) => {
	return {
		nickname: `nickname-${a.length - i}`,
		avatar: "https://github.com/shadcn.png",
		lastMessage: "Hello, World",
		date: new Date(),
	} as ConversationTabListItemProps;
});

const ChatSideBar = () => {
	return (
		<Tabs 
			className="w-1/4 flex flex-col h-full"
			defaultValue="channels"
		>
			<TabsList className="flex w-full rounded-lg">
				<TabsTrigger className="basis-1/2" value="conversations">Conversations</TabsTrigger>
				<TabsTrigger className="basis-1/2" value="channels">Channels</TabsTrigger>
			</TabsList>

			{/* <TabsContent value="conversations">Convs</TabsContent>
			<TabsContent value="channels">Channes</TabsContent> */}

			<ChannelTab />
			<ConversationTab />
		</Tabs>
	);
};

export default ChatSideBar;