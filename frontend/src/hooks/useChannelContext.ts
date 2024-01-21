import { ChannelDmItem } from "@/lib/types/channel-api-response";
import { createContext, useContext } from "react"

export interface ChannelItem {
	name: string,
	avatar: string,
	date: Date,
	lastMessage: string,
	messages: ChannelDmItem[],
}

export type ChannelList = Array<ChannelItem>;

type channelContextType = {
	channelData: ChannelList | null,
	setChannelData: (arg: ChannelList) => void
}

const user = {
	channelData: null,
	setChannelData: () => {}
}

export const channelContext = createContext<channelContextType>(user);

export function useChannelContext() {
	
	const {channelData, setChannelData} = useContext(channelContext);
	
	if (!channelData || !setChannelData)
		throw new Error("Channel context cannot be called without initialization");
	return {channelData, setChannelData};
}