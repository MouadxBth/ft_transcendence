import { ConversationsContext } from "@/contexts/ConversationsContext";
import { useContext } from "react";

export const useConversations = () => {
	const context = useContext(ConversationsContext);

	if (!context)
		throw new Error(`useConversations hook must be used inside an ConversationsContextProvider`);

	return context;
};
