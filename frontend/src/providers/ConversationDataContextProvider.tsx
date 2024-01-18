"use client";

import React, { useState } from "react";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";
import { ConversationList, conversationContext } from "@/hooks/useConversationContext";
import { ConversationApiResponse } from "@/lib/types/conversation-api-response";
import { DirectMessageApiResponse } from "@/lib/types/direct-message-api-response";


const conversationList: ConversationList = [{
	id: 2,
	nickname: "troy",
	createdAt: new Date(),
	updatedAt: new Date(),
	lastMessage: "...",
	avatar: "troy",
	messages: [] as DirectMessageApiResponse[]
}]

export default function ConversationContextProvider({ children }: any) {

	const [conversationData, setConversationData] = useState(conversationList);

	return (
		<conversationContext.Provider value={{conversationData, setConversationData}}>
			{children}
		</conversationContext.Provider>
	);
}

export { ConversationContextProvider };
