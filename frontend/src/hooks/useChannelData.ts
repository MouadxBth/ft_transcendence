import { createContext, useContext } from "react"
import { ChannelMessageProps } from "@/components/chat/channel/message/ChannelMessage";

const random = Array.from({ length: 20 }).map((_, i, a) => {
	return {
		id: i,
		sender: `nickname-${a.length - i}`,
		avatar: `https://robohash.org/${encodeURI(`nickname-${a.length - i}`)}`,
		message:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend sem et interdum euismod.",
		date: new Date(),
	} as ChannelMessageProps;
});

export interface ChannelItem {
	name: string,
	avatar: string,
	date: Date,
	lastMessage: string,
	messages: ChannelMessageProps[],
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