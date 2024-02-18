import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useSockets from "@/hooks/socket/useSockets";
import { ConversationMessageType } from "@/lib/types/conversation/conversation-message";
import { useEffect } from "react";
import { ConversationMessagesAction } from "../message/useConversationMessagesState";

const useConversationMessageUpdate = (
	target: string,
	conversationMessagesDispatch: React.Dispatch<ConversationMessagesAction>
) => {
	const { conversations } = useSockets();
	const { authenticatedUser } = useAuthentication();

	useEffect(() => {
		conversations?.on("receive_message", (message: ConversationMessageType) => {
			if (
				(message.sender.username === authenticatedUser?.user.username &&
					message.target.username === target) ||
				(message.sender.username === target &&
					message.target.username === authenticatedUser?.user.username)
			) {
				conversationMessagesDispatch({
					type: "ADD_MESSAGE",
					payload: message,
				});
			}
		});
	}, [target, conversations, authenticatedUser, conversationMessagesDispatch]);
};

export default useConversationMessageUpdate;
