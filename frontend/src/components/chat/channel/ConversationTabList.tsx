"use client";

import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { useConversationContext } from "@/hooks/useConversationContext";
import ConversationTabListItem from "../conversation/ConversationTabListItem";

const ConversationTabList = () => {
	
	const { conversationData } = useConversationContext();
	const pathname = usePathname();

	console.log("rendered conversation list");
	
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
						nickname={nickname!}
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
