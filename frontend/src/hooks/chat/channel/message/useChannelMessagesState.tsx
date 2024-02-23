import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { ChannelMessageType } from "@/lib/types/channel/channel-message";
import { Reducer, useReducer } from "react";

export interface ChannelMessagesState {
	messages: ChannelMessageType[];
}

export type ChannelMessagesAction =
	| { type: "ADD_MESSAGE"; payload: ChannelMessageType }
	| { type: "REMOVE_MESSAGES"; payload: ChannelMemberType }
	| { type: "FILTER_MESSAGES"; payload: string }
	| { type: "SET_MESSAGES"; payload: ChannelMessageType[] };

const channelMessagesReducer: Reducer<ChannelMessagesState, ChannelMessagesAction> = (
	state,
	action
) => {
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
		case "FILTER_MESSAGES":
			return {
				...state,
				messages: state.messages.filter(
					(message) => message.sender.user.username !== action.payload
				),
			};
		case "REMOVE_MESSAGES":
			return {
				...state,
				messages: state.messages.filter(
					(message) => message.sender.user.username !== action.payload.user.username
				),
			};
		default:
			return state;
	}
};

const useChannelMessagesState = () => {
	const [{ messages }, channelMessagesDispatch] = useReducer(channelMessagesReducer, {
		messages: [],
	});

	return {
		messages,
		channelMessagesDispatch,
	};
};

export default useChannelMessagesState;
