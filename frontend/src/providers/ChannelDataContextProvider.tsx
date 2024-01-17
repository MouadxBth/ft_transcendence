"use client";

import React, { useState } from "react";
import { ChannelList, channelContext } from "@/hooks/useChannelData";
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

const channelList: ChannelList = [
	{
		name: "random",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "hey.."
	},
	{
		name: "test",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "heysdf sdf sdf sdf.."
	},
	{
		name: "frontend",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "errr.."
	},
	{
		name: "backend",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "ff."
	},
	{
		name: "dev",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "hey.r."
	}
]

export default function ChannelContextProvider({ children }: any) {

	const [channelData, setChannelData] = useState(channelList);

	return (
		<channelContext.Provider value={{channelData, setChannelData}}>
			{children}
		</channelContext.Provider>
	);
}

export { ChannelContextProvider };
