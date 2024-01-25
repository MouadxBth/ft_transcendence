"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import ChatSideBar from "@/components/chat/ChatSideBar";
import Navbar from "@/components/navbar/Navbar";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import ChannelContextProvider from "@/providers/ChannelDataContextProvider";
import ConversationContextProvider from "@/providers/ConversationDataContextProvider";
import React, { useState } from "react";


const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	console.log("RENDERED!!!");

	return (
		<main className="h-full flex">
			<ChannelContextProvider>
				<ConversationContextProvider>

				<ChatSideBar />
			
				{children}

				</ConversationContextProvider>
			</ChannelContextProvider>
		</main>
	);
};

export default ChatLayout;
