"use client";

import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import ConversationTabListItem, { ConversationTabListItemProps } from "./ConversationTabListItem";
import { useConversationContext } from "@/hooks/useConversationContext";

const ConversationTabList = () => {
	
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
			<ScrollBar orientation="vertical"/>
		</ScrollArea>
	);
};

export default ConversationTabList;
