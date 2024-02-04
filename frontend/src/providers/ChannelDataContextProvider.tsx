"use client";

import React, { useEffect, useState } from "react";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelDmApiResponse, ChannelDmApiResponseSchema } from "@/lib/types/channel-api-response";


interface channelSocketDm {
	id: number;
	createdAt: string;
	updatedAt: string;
	content: string;
	read: boolean;
	senderId: string;
	channelId: string;
}

export default function ChannelContextProvider({ children, data }: {children: React.ReactNode, data: ChannelList}) {

	const [channelData, setChannelData] = useState<ChannelList>(data);
	const { channels } = useSockets();

	function getChannel(channel: string) {
		return channelData.find((item) => item.name == channel)
	}

	const onNewChannelMessage = (value: channelSocketDm) => {
		console.log("received channel message:", value);
		
		const channel = getChannel(value.channelId);
		channel?.messages.push(value);

		setChannelData([...channelData])
	}

	useEffect(() => {
		channels?.on("receive_message", onNewChannelMessage)
	}, [])

	return (
		<channelContext.Provider value={{channelData: channelData, setChannelData}}>
			{children}
		</channelContext.Provider>
	);
}

export { ChannelContextProvider };
