import { createContext, useContext } from "react"
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";
import { DirectMessageApiResponse } from "@/lib/types/direct-message-api-response";
import { ConversationApiResponse } from "@/lib/types/conversation-api-response";

const random = Array.from({ length: 20 }).map((_, i, a) => {
	return {
		id: i,
		sender: `nickname-${a.length - i}`,
		avatar: `https://robohash.org/${encodeURI(`nickname-${a.length - i}`)}`,
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend sem et interdum euismod.",
		date: new Date(),
	} as ChannelMessageProps;
});

export interface ConversationItem {
	id: number,
	nickname: string,
	avatar: string,
	createdAt: Date,
	updatedAt: Date,
	lastMessage: string,
	messages: DirectMessageApiResponse[],
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
