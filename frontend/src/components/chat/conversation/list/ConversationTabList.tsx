"use client";

import { usePathname } from "next/navigation";
import ConversationTabListItem, { ConversationTabListItemProps } from "./ConversationTabListItem";

export interface ConversationTabListProps {
	data: ConversationTabListItemProps[] | undefined;
}

const ConversationTabList = ({ data }: ConversationTabListProps) => {
	const pathname = usePathname();

	return (
		<>
			{!data || !data.length ? (
				<div className="p-5 ">You don&apos;t any conversations yet!</div>
			) : (
				data.map(({ nickname, avatar, lastMessage, date }) => (
					// <ChannelTabListItemSkeleton key={nicknickname} />
					<ConversationTabListItem
						key={nickname}
						active={pathname === `/chat/channel/${name}`}
						nickname={nickname}
						avatar={avatar}
						lastMessage={lastMessage}
						date={date}
					/>
				))
			)}
		</>
	);
};

export default ConversationTabList;
