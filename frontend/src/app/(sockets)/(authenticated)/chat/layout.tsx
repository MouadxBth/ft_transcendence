"use client";

import privatePage from "@/components/auth/protection/PrivatePage";
import ChatSideBar from "@/components/chat/ChatSideBar";
import Navbar from "@/components/navbar/Navbar";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import { ConversationList } from "@/hooks/useConversationContext";
import { fetchAllChannels, fetchChannelDirectMessages, fetchChannelUsers } from "@/lib/chat/channel/channel-service-endpoints";
import { fetchAllConversations, fetchAllDirectMessages } from "@/lib/chat/chat-service-endpoints";
import fetchUser from "@/lib/chat/user-service-endpoints";
import { DirectMessageApiResponse } from "@/lib/types/direct-message-api-response";
import ChannelContextProvider from "@/providers/ChannelDataContextProvider";
import ConversationContextProvider from "@/providers/ConversationDataContextProvider";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	
	console.log("Rendered chat page <layout>");

	async function fetchConversationData() {
			
		const conversation = await fetchAllConversations();
		
		let data: ConversationList = [];
		
		for (var i = 0; i < conversation.length; i++) {
			
			var {username, avatar, nickname} = await fetchUser(conversation[i].members[0].username);
			const messages = await fetchAllDirectMessages(username);
			
			console.log("got user messages:", messages);
			
			data.push({
				id: conversation[i].id,
				nickname: nickname!,
				username,
				avatar: avatar!,
				createdAt: new Date(conversation[i].createdAt),
				updatedAt: new Date(conversation[i].updatedAt),
				messages: messages,
				lastMessage: "a test message..."
			})
		}
		await new Promise(r => setTimeout(r, 900));
		
		return data;
	}

	async function fetchChannelData() {
		
		const channels = await fetchAllChannels();
		
		let data: ChannelList = [];
		
		for (var i = 0; i < channels.length; i++) {
			
			const { messages } = await fetchChannelDirectMessages(channels[i].name);
			const members = await fetchChannelUsers(channels[i].name);			
			
			data.push({
				...channels[i],
				members: members,
				messages: messages,
				lastMessage: messages.length ? messages[messages.length - 1].content : "N/A"
			})
		}
		await new Promise(r => setTimeout(r, 500));
		return data;
	}
	
	async function fetchChatData() {
		const conversationData = await fetchConversationData();
		const channelData = await fetchChannelData();
		return {conversationData, channelData};
	}

	const {
		isLoading,
		data,
		isError,
		error
	} = useQuery({
		queryKey: [],
		queryFn: fetchChatData
	})

	if (isLoading) {
		return (
			<div className="flex flex-col justify-center w-full">
				<div className="w-full">
					<h1 className="text-center w-full"> Loading data....</h1>
				</div>
			</div>
		)
	}
	else if (isError) {
		return (
			<div className="felx flex-col justify-center">
				<h1 className="text-center"> Error encountered</h1>
				<h3 className="text-center">{error.message}</h3>
			</div>
		)
	}

	return (
		<main className="h-full flex">
			<ChannelContextProvider data={data!.channelData}>
				<ConversationContextProvider data={data!.conversationData}>

				<ChatSideBar />
			
				{children}

				</ConversationContextProvider>
			</ChannelContextProvider>
		</main>
	);
};

export default ChatLayout;
