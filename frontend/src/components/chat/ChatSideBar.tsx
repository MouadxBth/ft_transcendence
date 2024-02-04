"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ConversationTab from "./conversation/ConversationTab";
import ChannelTab from "./channel/ChannelTab";

const ChatSideBar = () => {
	return (
		<Tabs 
			className="w-1/4 flex flex-col h-full"
			defaultValue="conversations"
		>
			<TabsList className="flex w-full rounded-lg p-0">
				<TabsTrigger className="basis-1/2 h-full w-full" value="conversations">Conversations</TabsTrigger>
				<TabsTrigger className="basis-1/2 h-full w-full" value="channels">Channels</TabsTrigger>
			</TabsList>

			{/* <TabsContent value="conversations">Convs</TabsContent>
			<TabsContent value="channels">Channes</TabsContent> */}

			<ChannelTab />
			<ConversationTab />
		</Tabs>
	);
};

export default ChatSideBar;
