import { ConversationType } from "@/lib/types/conversation/conversation";
import { Reducer, useReducer } from "react";

export interface ConversationsState {
	conversations: ConversationType[];
}

export type ConversationsAction =
	| { type: "ADD_CONVERSATION"; payload: ConversationType }
	| { type: "REMOVE_CONVERSATION"; payload: ConversationType }
	| { type: "SET_CONVERSATIONS"; payload: ConversationType[] }
	| { type: "UPDATE_CONVERSATION"; payload: ConversationType };

const conversationssReducer: Reducer<ConversationsState, ConversationsAction> = (state, action) => {
	switch (action.type) {
		case "ADD_CONVERSATION":
			return {
				...state,
				conversations: [...state.conversations, action.payload],
			};
		case "REMOVE_CONVERSATION":
			return {
				...state,
				conversations: state.conversations.filter(
					({ target }) => target.username !== action.payload.target.username
				),
			};
		case "SET_CONVERSATIONS":
			return {
				...state,
				conversations: action.payload,
			};
		case "UPDATE_CONVERSATION":
			return {
				...state,
				conversations: state.conversations.map((conversation) =>
					conversation.target.username === action.payload.target.username
						? { ...conversation, ...action.payload }
						: conversation
				),
			};
		default:
			return state;
	}
};

const useConversationsState = () => {
	const [{ conversations }, conversationsDispatch] = useReducer(conversationssReducer, {
		conversations: [],
	});

	return {
		conversations,
		conversationsDispatch,
	};
};

export default useConversationsState;
