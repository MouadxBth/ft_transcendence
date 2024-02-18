import { ChannelsAction } from "@/hooks/chat/channel/useChannelsState";
import { ChannelType } from "@/lib/types/channel/channel";
import { Dispatch, createContext } from "react";

interface ChannelsContextType {
	channels: ChannelType[];
	channelsDispatch: Dispatch<ChannelsAction>;
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
}

export const ChannelsContext = createContext<ChannelsContextType>({
	channels: [],
	channelsDispatch: () => {},
	isLoading: false,
	isError: false,
	error: null,
});
