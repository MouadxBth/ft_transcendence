import { ChannelType } from "@/lib/types/channel/channel";
import { Reducer, useReducer } from "react";

export interface ChannelsState {
	channels: ChannelType[];
}

export type ChannelsAction =
	| { type: "ADD_CHANNEL"; payload: ChannelType }
	| { type: "REMOVE_CHANNEL"; payload: ChannelType }
	| { type: "SET_CHANNELS"; payload: ChannelType[] }
	| { type: "UPDATE_CHANNEL"; payload: ChannelType };

const channelsReducer: Reducer<ChannelsState, ChannelsAction> = (state, action) => {
	switch (action.type) {
		case "ADD_CHANNEL":
			return {
				...state,
				channels: [...state.channels, action.payload],
			};
		case "REMOVE_CHANNEL":
			return {
				...state,
				channels: state.channels.filter((channel) => channel.name !== action.payload.name),
			};
		case "SET_CHANNELS":
			return {
				...state,
				channels: action.payload,
			};
		case "UPDATE_CHANNEL":
			return {
				...state,
				channels: state.channels.map((channel) =>
					channel.name === action.payload.name ? { ...channel, ...action.payload } : channel
				),
			};
		default:
			return state;
	}
};

const useChannelsState = () => {
	const [{ channels }, channelsDispatch] = useReducer(channelsReducer, {
		channels: [],
	});

	return {
		channels,
		channelsDispatch,
	};
};

export default useChannelsState;
