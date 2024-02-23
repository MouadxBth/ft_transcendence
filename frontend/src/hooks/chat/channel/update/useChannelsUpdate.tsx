import { Dispatch, useEffect } from "react";

import { ChannelsAction } from "../useChannelsState";
import { ChannelType } from "@/lib/types/channel/channel";
import useSockets from "@/hooks/socket/useSockets";
import { useQueryClient } from "@tanstack/react-query";

const useChannelsUpdate = (channelsDispatch: Dispatch<ChannelsAction>) => {
	const { channels } = useSockets();
	const queryClient = useQueryClient();

	useEffect(() => {
		channels?.on("channel_deleted", (args: ChannelType) => {
			channelsDispatch({
				type: "REMOVE_CHANNEL",
				payload: args,
			});
		});

		channels?.on("added_channel_password", (args: ChannelType) => {
			channelsDispatch({
				type: "UPDATE_CHANNEL",
				payload: args,
			});

			queryClient.invalidateQueries({
				queryKey: ["channel", args.name],
			});
		});

		channels?.on("modified_channel_password", (args: ChannelType) => {
			channelsDispatch({
				type: "UPDATE_CHANNEL",
				payload: args,
			});

			queryClient.invalidateQueries({
				queryKey: ["channel", args.name],
			});
		});

		channels?.on("deleted_channel_password", (args: ChannelType) => {
			channelsDispatch({
				type: "UPDATE_CHANNEL",
				payload: args,
			});

			queryClient.invalidateQueries({
				queryKey: ["channel", args.name],
			});
		});
	}, [channels, queryClient, channelsDispatch]);
};

export default useChannelsUpdate;
