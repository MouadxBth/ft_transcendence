import { ConversationsAction } from "@/hooks/chat/conversation/useConversationsState";
import { ConversationType } from "@/lib/types/conversation/conversation";
import { Dispatch, createContext } from "react";

interface ConversationsContextType {
	conversations: ConversationType[];
	conversationsDispatch: Dispatch<ConversationsAction>;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export const ConversationsContext = createContext<ConversationsContextType>({
	conversations: [],
	conversationsDispatch: () => {},
	isLoading: false,
	isError: false,
	error: null,
});
