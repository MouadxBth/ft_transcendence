"use client";

import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationMessageListSkeleton from "./ConversationMessageListSkeleton";
import ConversationMessageLoadMore from "./ConversationMessageLoadMore";
import ConversationMessage from "./ConversationMessage";
import useConversationMessagesInfinite from "@/hooks/chat/conversation/message/useConversationMessagesInfinite";
import useConversationMessagesState from "@/hooks/chat/conversation/message/useConversationMessagesState";
import useConversationMessageUpdate from "@/hooks/chat/conversation/update/useConversationMessagesUpdate";

export interface ConversationMessageListProps {
	className?: string;
	target: string;
}

const ConversationMessageList = ({ className, target }: ConversationMessageListProps) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { messages, conversationMessagesDispatch } = useConversationMessagesState();
	const [loading, setLoading] = useState(true);
	const { data, isFetching, fetchNextPage, hasNextPage } = useConversationMessagesInfinite(target);

	useConversationMessageUpdate(target, conversationMessagesDispatch);

	useEffect(() => {
		if (isFetching) return;

		setLoading(false);

		if (!data) return;

		conversationMessagesDispatch({
			type: "SET_MESSAGES",
			payload: data.pages.flat(),
		});
	}, [isFetching, data, conversationMessagesDispatch]);

	if (loading) return <ConversationMessageListSkeleton className={className} />;

	if (!messages || !messages.length) {
		return <div className="p-5 bg-black h-full text-center">No messages sent yet!</div>;
	}

	return (
		<ScrollArea className={className}>
			<ConversationMessageLoadMore
				className="w-full"
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
			/>
			{messages.map(({ id, sender, content, createdAt }, index) => (
				<ConversationMessage
					key={id}
					id={id}
					sender={sender.nickname}
					avatar={sender.avatar}
					message={content}
					date={createdAt}
					reference={index === messages.length - 1 ? messagesEndRef : undefined}
				/>
			))}
		</ScrollArea>
	);
};

export default ConversationMessageList;
