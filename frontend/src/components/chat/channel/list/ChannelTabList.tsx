"use client";

import { usePathname } from "next/navigation";
import ChannelTabListItem, { ChannelTabListItemProps } from "./ChannelTabListItem";
import ChannelTabListItemSkeleton from "./ChannelTabListItemSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChannelList } from "@/hooks/useChannelContext";

export interface ChannelTabListProps {
	data: ChannelTabListItemProps[] | undefined;
}

const ChannelTabList = ({ data } : {data: ChannelList}) => {
	const pathname = usePathname();

	return (
		<ScrollArea className="h-full">
			{!data || !data.length ? (
				<div className="p-5 ">You don&apos;t any conversations yet!</div>
			) : (
				data.map(({ name, avatar, lastMessage, date }) => (
					// <ChannelTabListItemSkeleton key={nickname} />
					<ChannelTabListItem
						key={name}
						active={pathname === `/chat/channel/${name}`}
						nickname={name}
						avatar={avatar}
						lastMessage={lastMessage}
						date={date}
					/>
				))
			)}
		</ScrollArea>
	);
};

export default ChannelTabList;
