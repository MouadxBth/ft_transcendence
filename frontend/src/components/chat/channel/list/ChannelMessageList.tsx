"use client";

import React, { useEffect, useRef } from "react";
import ChannelMessage, { ChannelMessageProps } from "../ChannelMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChannelMessageListProps {
	data: ChannelMessageProps[] | undefined;
}

const ChannelMessageList = ({ data }: ChannelMessageListProps) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, []);

	return (
		<ScrollArea>
			{!data || !data.length ? (
				<div className="p-5 bg-black">You don&apos;t any conversations yet!</div>
			) : (
				data.map(({ id, sender, message, avatar, date }) => (
					<ChannelMessage
						key={sender}
						id={id}
						sender={sender}
						avatar={avatar}
						message={message}
						date={date}
					/>
				))
			)}
			<div ref={messagesEndRef} />
		</ScrollArea>
	);
};

export default ChannelMessageList;
