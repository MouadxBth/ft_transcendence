"use client";

import { usePathname } from "next/navigation";
import ChannelTabListItem, { ChannelTabListItemProps } from "./ChannelTabListItem";
import ChannelTabListItemSkeleton from "./ChannelTabListItemSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChannelList } from "@/hooks/useChannelContext";
import { Scrollbar } from "@radix-ui/react-scroll-area";

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
				data.map((item) => (
					// <ChannelTabListItemSkeleton key={nickname} />
					<ChannelTabListItem
						{...item}
						key={item.name}
						active={pathname === `/chat/channel/${item.name}`}
					/>
				))
			)}
			<Scrollbar orientation="vertical"/>
		</ScrollArea>
	);
};

export default ChannelTabList;
