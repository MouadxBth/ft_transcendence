"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import ChatSideBar from "@/components/chat/ChatSideBar";
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";
import Navbar from "@/components/navbar/Navbar";
import { ChannelList, channelContext } from "@/hooks/useChannelData";
import ChannelContextProvider from "@/providers/ChannelDataContextProvider";
import React, { useState } from "react";


const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	console.log("RENDERED!!!");

	return (
		<main className="h-screen flex">
			<ChannelContextProvider>

				<ChatSideBar />
				{/* <article>Main content</article> */}
				{children}

			</ChannelContextProvider>
		</main>
	);
};

export default ChatLayout;
