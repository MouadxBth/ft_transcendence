"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import useChannelsFind from "@/hooks/chat/channel/useChannelsFind";
import { ChannelType } from "@/lib/types/channel/channel";
import React, { useEffect, useState } from "react";
import ChannelFindListItem from "./ChannelFindListItem";

export interface ChannelFindListProps {
	select: (value: string, status: string) => void;
	selected: string;
}

const ChannelFindList = ({ selected, select }: ChannelFindListProps) => {
	const { data, isLoading } = useChannelsFind();
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
					<ChannelFindListItem
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

export default ChannelFindList;
