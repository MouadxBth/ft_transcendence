"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useChannelsInvited from "@/hooks/chat/channel/useChannelsInvited";
import { ChannelType } from "@/lib/types/channel/channel";
import React, { useEffect, useState } from "react";
import ChannelInvitedListItem from "./ChannelInvitedListItem";

export interface ChannelInvitedListProps {
	select: (value: string) => void;
	selected: string;
}

const ChannelInvitedList = ({ selected, select }: ChannelInvitedListProps) => {
	const { data, isLoading } = useChannelsInvited();
	const [channels, setChannels] = useState<ChannelType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;

		if (data && data.length) {
			setChannels(data);
		}

		setLoading(false);
	}, [isLoading, data]);

	if (loading) return <div className="text-center">Loading...</div>;

	if (!channels.length) return <div className="text-center">No channels found!</div>;

	return (
		<ScrollArea className=" w-full">
			<div className="w-full h-24 pr-3">
				{channels.map((channel) => (
					<ChannelInvitedListItem
						key={channel.name}
						channel={channel}
						selected={selected}
						select={select}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default ChannelInvitedList;
