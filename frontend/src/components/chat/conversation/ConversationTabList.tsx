"use client";

import { usePathname } from "next/navigation";
import { ScrollArea } from "../../ui/scroll-area";
import ConversationTabListItem, { ConversationTabListItemProps } from "./ConversationTabListItem";

export interface ConversationTabListProps {
	data: ConversationTabListItemProps[] | undefined;
}

const ConversationTabList = ({ data }: ConversationTabListProps) => {
	const pathname = usePathname();

	return (
		<ScrollArea className="h-full">
			{!data || !data.length ? (
				<div className="p-5 ">You don&apos;t any conversations yet!</div>
			) : (
				data.map(({ nickname, avatar, lastMessage, date }) => (
					<ConversationTabListItem
						key={nickname}
						active={pathname === `/chat/conversation/${nickname}`}
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
