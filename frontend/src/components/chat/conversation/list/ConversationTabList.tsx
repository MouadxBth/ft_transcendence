"use client";

import { usePathname } from "next/navigation";
import ChannelTabListSkeleton from "./skeleton/ConversationTabListSkeleton";
import { useConversations } from "@/hooks/chat/conversation/useConversations";
import ConversationTabListItem from "./ConversationTabListItem";

export interface ChannelTabListProps {
	query: string;
}

const ConversationTabList = ({ query }: ChannelTabListProps) => {
	const { conversations, isLoading } = useConversations();
	const pathname = usePathname();

	if (isLoading) {
		return <ChannelTabListSkeleton />;
	}

	const currentConversations = conversations.filter((value) =>
		value.target.nickname.includes(query)
	);

	if (!conversations || !conversations.length) {
		return <div className="p-5 text-sm">{"You haven't joined any conversations yet!"}</div>;
	}

	if (!currentConversations || !currentConversations.length) {
		return <div className="p-5 text-sm">{`No conversation with \"${query}\"`}</div>;
	}

	return (
		<>
			{currentConversations.map((conversation) => (
				<ConversationTabListItem
					key={conversation.id}
					active={pathname === `/chat/conversation/${conversation.target.username}`}
					conversation={conversation}
				/>
			))}
		</>
	);
};

export default ConversationTabList;
