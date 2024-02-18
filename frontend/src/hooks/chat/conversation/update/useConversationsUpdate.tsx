import { Dispatch, useEffect } from "react";

import useSockets from "@/hooks/socket/useSockets";
import { ConversationsAction } from "../useConversationsState";
import { ConversationType } from "@/lib/types/conversation/conversation";

const useConversationsUpdate = (conversationsDispatch: Dispatch<ConversationsAction>) => {
	const { conversations } = useSockets();

	useEffect(() => {
		conversations?.on("conversation_created", (args: ConversationType) => {
			conversationsDispatch({
				type: "ADD_CONVERSATION",
				payload: args,
			});
		});

		conversations?.on("conversation_added", (args: ConversationType) => {
			conversationsDispatch({
				type: "ADD_CONVERSATION",
				payload: args,
			});
		});

		conversations?.on("conversation_deleted", (args: ConversationType) => {
			conversationsDispatch({
				type: "REMOVE_CONVERSATION",
				payload: args,
			});
		});

		conversations?.on("conversation_removed", (args: ConversationType) => {
			conversationsDispatch({
				type: "REMOVE_CONVERSATION",
				payload: args,
			});
		});
	}, [conversations, conversationsDispatch]);
};

export default useConversationsUpdate;
