"use client";

import React, { useState } from "react";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";
import { ConversationList, conversationContext } from "@/hooks/useConversationContext";
import { ConversationApiResponse } from "@/lib/types/conversation-api-response";
import { DirectMessageApiResponse } from "@/lib/types/direct-message-api-response";
import { useQuery } from "@tanstack/react-query";
import { fetchAllConversations, fetchAllDirectMessages } from "@/lib/chat/chat-service-endpoints";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import useUserSearch from "@/hooks/user/useUserSearch";
import fetchUser from "@/lib/chat/user-service-endpoints";
import { stringify } from "querystring";


const conversationList: ConversationList = [{
	id: 2,
	nickname: "troy",
	username: "troy",
	createdAt: new Date(),
	updatedAt: new Date(),
	lastMessage: "...",
	avatar: "troy",
	messages: [] as DirectMessageApiResponse
}]

export default function ConversationContextProvider({ children }: any) {
	
	const [conversationData, setConversationData] = useState(conversationList);
	
	async function fetchConversationData() {
		
		const conversation = await fetchAllConversations();
		
		let data: ConversationList = conversationList;
		
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
		await new Promise(r => setTimeout(r, 500));
		
		return data;
	}
	
	const {
		isLoading,
		data,
		isError,
		error
	} = useQuery({
		queryKey: ["fetch_conversation"],
		queryFn: fetchConversationData,
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
	if (isError) {
		return (
			<div className="felx flex-col justify-center">
				<h1 className="text-center"> Error encountered</h1>
				<h3 className="text-center">{error.message}</h3>
			</div>
		)
	}
	
	//setConversationData(data!);
	
	return (
		<conversationContext.Provider value={{conversationData: data!, setConversationData}}>
			{children}
		</conversationContext.Provider>
	);
}