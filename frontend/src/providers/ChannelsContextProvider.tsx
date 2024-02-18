"use client";

import { ChannelsContext } from "@/contexts/ChannelsContext";
import useChannelMembersUpdate from "@/hooks/chat/channel/update/useChannelMembersUpdate";
import useChannelsUpdate from "@/hooks/chat/channel/update/useChannelsUpdate";
import useChannelsOf from "@/hooks/chat/channel/useChannelsOf";
import useChannelsState from "@/hooks/chat/channel/useChannelsState";
import { useEffect, useState } from "react";

const ChannelsContextProvider = ({ children }: { children: React.ReactNode }) => {
	const { channels, channelsDispatch } = useChannelsState();
	const { data, isLoading, isError, error } = useChannelsOf();
	const [loading, setLoading] = useState(true);

	useChannelsUpdate(channelsDispatch);
	useChannelMembersUpdate(channelsDispatch);

	useEffect(() => {
		if (isLoading || !data) return;

		channelsDispatch({
			type: "SET_CHANNELS",
			payload: data,
		});

		console.log("CHANNELS", data);

		setLoading(false);
	}, [isLoading, data, channelsDispatch]);

	if (loading) return null;

	return (
		<ChannelsContext.Provider
			value={{
				channels,
				channelsDispatch,
				isLoading: loading,
				isError,
				error,
			}}
		>
			{children}
		</ChannelsContext.Provider>
	);
};

export default ChannelsContextProvider;
