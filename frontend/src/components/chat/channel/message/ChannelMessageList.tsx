"use client";

import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMessageSkeleton from "./ChannelMessageSkeleton";
import ChannelMessage, { ChannelMessageProps } from "./ChannelMessage";
import { useChannelContext } from "@/hooks/useChannelContext";

export interface ChannelMessageListProps {
	data: ChannelMessageProps[] | undefined;
}

const ChannelMessageList = ({name}: {name: string}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const {channelData} = useChannelContext();
	
	const getChannelMessages = () => {
		return channelData.find((ele) => ele.name === name);
	}
	
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	};
	
	const channelMessages = getChannelMessages()?.messages;

	useEffect(() => {
		scrollToBottom();
	});

	console.log("finished rendering channel list...");
	return (
		<ScrollArea className="h-full">
			{!channelMessages || !channelMessages.length ? (
				<div className="p-5 text-center flex flex-col justify-center h-full">
					<div>
						You don&apos;t any conversations yet!
					</div>
				</div>
			) : (
				channelMessages.map(({ id, senderId, content, createdAt, updatedAt}) => (
					// <ChannelMessageSkeleton key={sender} />
					<ChannelMessage
						key={senderId}
						id={id}
						senderId={senderId}
						content={content}
						createdAt={createdAt}
						updatedAt={updatedAt}
					/>
				))
			)}
			<div ref={messagesEndRef}/>
		</ScrollArea>
	);
};

export default ChannelMessageList;
