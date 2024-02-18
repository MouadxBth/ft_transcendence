import { Dispatch, useEffect } from "react";

import { ChannelsAction } from "../useChannelsState";
import { ChannelType } from "@/lib/types/channel/channel";
import useSockets from "@/hooks/socket/useSockets";

const useChannelsUpdate = (channelsDispatch: Dispatch<ChannelsAction>) => {
	const { channels } = useSockets();

	useEffect(() => {
		channels?.on("channel_deleted", (args: ChannelType) => {
			channelsDispatch({
				type: "REMOVE_CHANNEL",
				payload: args,
			});
		});
	}, [channels, channelsDispatch]);
};

export default useChannelsUpdate;
