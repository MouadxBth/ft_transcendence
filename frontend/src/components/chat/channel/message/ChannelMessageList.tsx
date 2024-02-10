"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMessage from "./ChannelMessage";
import { ChannelMessageType } from "@/lib/types/chat/channel/channel-message";
import useChannelMessage from "@/hooks/chat/channel/useChannelMessages";
import useSockets from "@/hooks/socket/useSockets";
import useChannelMessagesState from "@/hooks/chat/channel/useChannelMessagesState";
import { ChannelType } from "@/lib/types/chat/channel/channel";
import { ChannelMemberType } from "@/lib/types/chat/channel/channel-member";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export interface ChannelMessageListProps {
	className?: string;
	channel: string;
}

const ChannelMessageList = ({ className, channel }: ChannelMessageListProps) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, channelMessagesDispatch } = useChannelMessagesState();
	const [loading, setLoading] = useState(true);
	const { data, isLoading } = useChannelMessage(channel);
	const { channels } = useSockets();
	const { authenticatedUser } = useAuthentication();

	useEffect(() => {
		channels?.on("recieve_message", (args: ChannelMessageType) => {
			// console.log(args);
			channelMessagesDispatch({
				type: "ADD_MESSAGE",
				payload: args,
			});

			scrollToBottom();
		});
		channels?.on("member_left", (channel: ChannelType, member: ChannelMemberType) => {
			console.log(channel, member);

			if (authenticatedUser?.user.username === member.user.username) {
				return;
			}

			channelMessagesDispatch({
				type: "REMOVE_MESSAGES",
				payload: member,
			});
		});
	}, [channels, authenticatedUser, channelMessagesDispatch]);

	useEffect(() => {
		scrollToBottom();
		if (isLoading) return;

		setLoading(false);

		if (!data) return;

		channelMessagesDispatch({
			type: "SET_MESSAGES",
			payload: data,
		});
	}, [isLoading, data, channelMessagesDispatch]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	if (loading) return <div>Loading...</div>;

	if (!messages || !messages.length) {
		return <div className="p-5 bg-black">You don&apos;t any conversations yet!</div>;
	}

	return (
		<>
			<ScrollArea className={className}>
				{messages.map(({ id, sender, content, createdAt }) => (
					// <ChannelMessageSkeleton key={sender} />
					<ChannelMessage
						key={id}
						id={id}
						sender={sender.user.nickname}
						avatar={sender.user.avatar}
						message={content}
						date={createdAt}
					/>
				))}
				<div ref={messagesEndRef}></div>
			</ScrollArea>
		</>
	);
};

export default ChannelMessageList;
