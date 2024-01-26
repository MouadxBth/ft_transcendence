import { createContext, useContext } from "react"
import { DirectMessageApiResponse } from "@/lib/types/direct-message-api-response";
import { ConversationApiResponse } from "@/lib/types/conversation-api-response";


export interface ConversationItem {
	id: number,
	nickname: string,
	username: string,
	avatar: string,
	createdAt: Date,
	updatedAt: Date,
	lastMessage: string,
	messages: DirectMessageApiResponse,
}

export type ConversationList = Array<ConversationItem>;

type ConversationContextType = {
	conversationData: ConversationList | null,
	setConversationData: (arg: ConversationList) => void
}

const user = {
	conversationData: null,
	setConversationData: () => {}
}

export const conversationContext = createContext<ConversationContextType>(user);

export function useConversationContext() {
	
	const {conversationData, setConversationData} = useContext(conversationContext);
	
	if (!conversationData || !setConversationData)
		throw new Error("Conversation context cannot be called without initialization");
	
		return {conversationData, setConversationData};
}
