"use client";

import { ConversationsContext } from "@/contexts/ConversationsContext";
import useConversationsUpdate from "@/hooks/chat/conversation/update/useConversationsUpdate";
import useConversationsOf from "@/hooks/chat/conversation/useConversationsOf";
import useConversationsState from "@/hooks/chat/conversation/useConversationsState";
import { useEffect, useState } from "react";

const ConversationsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { conversations, conversationsDispatch } = useConversationsState();
	const { data, isLoading, isError, error } = useConversationsOf();
	const [loading, setLoading] = useState(true);

	useConversationsUpdate(conversationsDispatch);

	useEffect(() => {
		if (isLoading || !data) return;

		conversationsDispatch({
			type: "SET_CONVERSATIONS",
			payload: data,
		});

		setLoading(false);
	}, [isLoading, data, conversationsDispatch]);

	if (loading) return null;

	return (
		<ConversationsContext.Provider
			value={{
				conversations,
				conversationsDispatch,
				isLoading: loading,
				isError,
				error,
			}}
		>
			{children}
		</ConversationsContext.Provider>
	);
};

export default ConversationsContextProvider;
