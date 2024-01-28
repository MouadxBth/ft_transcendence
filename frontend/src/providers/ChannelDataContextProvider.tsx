"use client";

import React, { useState } from "react";
import { ChannelList, channelContext } from "@/hooks/useChannelContext";
import { fetchAllChannels, fetchChannelDirectMessages } from "@/lib/chat/channel-service-endpoints";
import { useQuery } from "@tanstack/react-query";
import { ChannelDmItem } from "@/lib/types/channel-api-response";

const random = Array.from({ length: 20 }).map((_, i, a) => {
	return {
		id: i,
		senderId: `nickname-${a.length - i}`,
		content:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend sem et interdum euismod.",
		createdAt: Date(),
		updatedAt: Date(),
	} as ChannelDmItem;
}); 

const channelList: ChannelList = [
	{
		name: "random",
		messages: random.slice(),
		avatar: "",
		date: new Date(),
		lastMessage: "hey.."
	}
]

export default function ChannelContextProvider({ children }: any) {

	const [channelData, setChannelData] = useState(channelList);
	
	async function fetchChannelData() {
		
		const channels = await fetchAllChannels();
		
		let data: ChannelList = channelList;
		
		for (var i = 0; i < channels.length; i++) {
			
			const { messages } = await fetchChannelDirectMessages(channels[i].name);
			
			console.log("got user messages:", messages);
			
			data.push({
				name: channels[i].name,
				avatar: "n/a",
				date: new Date(channels[i].createdAt),
				messages: messages,
				lastMessage: messages.length ? messages[messages.length - 1].content : "N/A"
			})
		}

		await new Promise(r => setTimeout(r, 500));
		
		return data;
	}
	
	const {
		isLoading,
		data,
		isError,
		error
	} = useQuery({
		queryKey: ["fetch_channel"],
		queryFn: fetchChannelData,
	})

	
	if (isLoading) {
		return (
			<div className="flex flex-col justify-center w-full">
				<div className="w-full">
					<h1 className="text-center w-full"> Loading data....</h1>
				</div>
			</div>
		)
	}
	if (isError) {
		return (
			<div className="felx flex-col justify-center">
				<h1 className="text-center"> Error encountered</h1>
				<h3 className="text-center">{error.message}</h3>
			</div>
		)
	}
	
	const channels = fetchAllChannels();
	console.log("fetched user channels:", channels);
	const channelDms =  fetchChannelDirectMessages("a demo channel");
	console.log("fetched user channels DMs:", channelDms);
	return (
		<channelContext.Provider value={{channelData: data!, setChannelData}}>
			{children}
		</channelContext.Provider>
	);
}

export { ChannelContextProvider };
