"use client";

import { usePathname } from "next/navigation";
import ChannelTabListItem from "./ChannelTabListItem";
import ChannelTabListSkeleton from "./skeleton/ChannelTabListSkeleton";
import { useChannels } from "@/hooks/chat/channel/useChannels";

export interface ChannelTabListProps {
	query: string;
}

const ChannelTabList = ({ query }: ChannelTabListProps) => {
	const pathname = usePathname();
	const { channels, isLoading } = useChannels();

	if (isLoading) {
		return <ChannelTabListSkeleton />;
	}

	const currentChannels = channels.filter((value) => value.name.includes(query));

	if (!channels || !channels.length) {
		return <div className="p-5 text-sm">{"You haven't joined any channels yet!"}</div>;
	}

	if (!currentChannels || !currentChannels.length) {
		return <div className="p-5 text-sm">{`No channel named \"${query}\"`}</div>;
	}

	return (
		<>
			{currentChannels.map(({ name, topic, createdAt, members, status }) => (
				<ChannelTabListItem
					key={name}
					active={pathname === `/chat/channel/${name}`}
					name={name}
					topic={topic}
					date={createdAt}
					members={members.length}
					status={status}
				/>
			))}
		</>
	);
};

export default ChannelTabList;
