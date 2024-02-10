"use client";

import ChatSidebarContent from "../sidebar/ChatSidebarContent";
import { useEffect, useRef, useState } from "react";
import useChannelsOf from "@/hooks/chat/channel/useChannelsOf";
import useChannelsUpdate from "@/hooks/chat/channel/useChannelsUpdate";
import useChannelsState from "@/hooks/chat/channel/useChannelsState";
import useChannelMembersUpdate from "@/hooks/chat/channel/useChannelMembersUpdate";
import { ChannelType } from "@/lib/types/chat/channel/channel";
import ChannelTabContent from "./content/ChannelTabContent";

const ChannelTab = () => {
	const { data, isLoading } = useChannelsOf();
	const { channels, channelsDispatch } = useChannelsState();
	const [loading, setLoading] = useState(true);
	const channelsRef = useRef<ChannelType[]>([]);

	useChannelsUpdate(channelsDispatch);
	useChannelMembersUpdate(channelsDispatch);

	useEffect(() => {
		if (isLoading || !data) return;

		channelsDispatch({
			type: "SET_CHANNELS",
			payload: data,
		});

		channelsRef.current = data;

		setLoading(false);
	}, [isLoading, data, channelsDispatch]);

	return (
		<ChatSidebarContent value="channels">
			<ChannelTabContent
				channels={channels}
				loading={loading}
			/>
		</ChatSidebarContent>
	);
};

export default ChannelTab;
