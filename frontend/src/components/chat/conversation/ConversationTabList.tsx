"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "../../ui/scroll-area";
import ConversationTabListItem, { ConversationTabListItemProps } from "./ConversationTabListItem";
import { useConversationContext } from "@/hooks/useConversationContext";

export interface ConversationTabListProps {
	data: ConversationTabListItemProps[] | undefined;
}

const ConversationTabList = ({ data }: ConversationTabListProps) => {
	
	const { conversationData } = useConversationContext();
	const pathname = usePathname();

	return (
		<ScrollArea className="h-full">
			{!conversationData || !conversationData.length ? (
				<div className="p-5 ">You don&apos;t any conversations yet!</div>
			) : (
				conversationData.map(({ nickname, username, avatar, lastMessage, updatedAt: date }) => (
					<ConversationTabListItem
						key={nickname}
						username={username}
						active={pathname === `/chat/conversation/${username}`}
						nickname={nickname}
						avatar={avatar}
						lastMessage={lastMessage}
						date={date}
					/>
				))
			)}
		</ScrollArea>
	);
};

export default ConversationTabList;
