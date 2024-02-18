import { ConversationMemberType } from "@/lib/types/conversation/conversation-member";
import { ConversationMessageType } from "@/lib/types/conversation/conversation-message";
import { Reducer, useReducer } from "react";

export interface ConversationMessagesState {
	messages: ConversationMessageType[];
}

export type ConversationMessagesAction =
	| { type: "ADD_MESSAGE"; payload: ConversationMessageType }
	| { type: "REMOVE_MESSAGES"; payload: ConversationMemberType }
	| { type: "SET_MESSAGES"; payload: ConversationMessageType[] };

const conversationMessagesReducer: Reducer<
	ConversationMessagesState,
	ConversationMessagesAction
> = (state, action) => {
	switch (action.type) {
		case "ADD_MESSAGE":
			return {
				...state,
				messages: [...state.messages, action.payload],
			};
		case "SET_MESSAGES":
			return {
				...state,
				messages: action.payload,
			};
		case "REMOVE_MESSAGES":
			return {
				...state,
				messages: state.messages.filter(
					(message) => message.sender.username !== action.payload.username
				),
			};
		default:
			return state;
	}
};

const useConversationMessagesState = () => {
	const [{ messages }, conversationMessagesDispatch] = useReducer(conversationMessagesReducer, {
		messages: [],
	});

	return {
		messages,
		conversationMessagesDispatch,
	};
};

export default useConversationMessagesState;
