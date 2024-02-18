"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMessage from "./ChannelMessage";
import useSockets from "@/hooks/socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ChannelType } from "@/lib/types/channel/channel";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { ChannelMessageType } from "@/lib/types/channel/channel-message";
import ChannelMessageListSkeleton from "./ChannelMessageListSkeleton";
import ChannelMessageLoadMore from "./ChannelMessageLoadMore";
import useChannelMessagesState from "@/hooks/chat/channel/message/useChannelMessagesState";
import useChannelMessagesInfinite from "@/hooks/chat/channel/message/useChannelMessagesInfinite";

export interface ChannelMessageListProps {
	className?: string;
	channel: string;
}

const ChannelMessageList = ({ className, channel }: ChannelMessageListProps) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, channelMessagesDispatch } = useChannelMessagesState();
	const [loading, setLoading] = useState(true);
	const { data, isFetching, fetchNextPage, hasNextPage } = useChannelMessagesInfinite(channel);
	const { channels } = useSockets();
	const { authenticatedUser } = useAuthentication();

	useEffect(() => {
		channels?.on("recieve_message", (message: ChannelMessageType) => {
			channelMessagesDispatch({
				type: "ADD_MESSAGE",
				payload: message,
			});
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
		if (isFetching) return;

		setLoading(false);

		if (!data) return;

		channelMessagesDispatch({
			type: "SET_MESSAGES",
			payload: data.pages.flat(),
		});
	}, [isFetching, data, channelMessagesDispatch]);

	if (loading) return <ChannelMessageListSkeleton className={className} />;

	if (!messages || !messages.length) {
		return <div className="p-5 bg-black h-full text-center">No messages sent yet!</div>;
	}

	return (
		<ScrollArea className={className}>
			<ChannelMessageLoadMore
				channel={channel}
				className="w-full"
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
			/>
			{messages.map(({ id, sender, content, createdAt }, index) => (
				<ChannelMessage
					key={id}
					id={id}
					sender={sender.user.nickname}
					avatar={sender.user.avatar}
					message={content}
					date={createdAt}
					reference={index === messages.length - 1 ? messagesEndRef : undefined}
				/>
			))}
		</ScrollArea>
	);
};

export default ChannelMessageList;
