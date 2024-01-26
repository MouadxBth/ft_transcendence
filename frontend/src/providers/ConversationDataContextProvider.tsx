"use client";

import React, { useEffect, useState } from "react";
import { ConversationList, conversationContext } from "@/hooks/useConversationContext";
import useSockets from "@/hooks/socket/useSockets";

export default function ConversationContextProvider({ children, data }: {children: any, data: ConversationList}) {
	
	console.log("conversation context provider renderd...");

	const [conversationData, setConversationData] = useState<ConversationList>(data);
	const { conversations } = useSockets();

	function getUserMessages(username: string) {

		const res =  conversationData.find((ele) => ele.username === username);
		
		if (!res) {
			throw Error("cannot find elemnt in conversation data: " + username)
		}

		return res;
	}

	const onNewMessage = (value: {content: string, target: string}) => {
		console.log("received d:", value);
		const messages = getUserMessages(value.target);
		messages?.messages.push({
			id: 2,
			createdAt: Date(),
			updatedAt: Date(),
			content: value.content,
			senderId: value.target,
			read: false,
		})
		setConversationData(conversationData.slice());
	}

	useEffect(() => {
		conversations?.on("receive_message", onNewMessage);
	}, []);

	return (
		<conversationContext.Provider value={{conversationData, setConversationData}}>
			{children}
		</conversationContext.Provider>
	);
}