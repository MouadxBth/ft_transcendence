import { Dispatch, SetStateAction, useEffect } from "react";
import useSockets from "../../socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ChannelType } from "@/lib/types/chat/channel/channel";
import { ChannelMemberType } from "@/lib/types/chat/channel/channel-member";
import { toast as sonner } from "sonner";
import { ChannelsAction } from "./useChannelsState";

// setChannel: Dispatch<SetStateAction<ChannelType>>

const useChannelMembersUpdate = (channelsDispatch: Dispatch<ChannelsAction>) => {
	const { authenticatedUser } = useAuthentication();
	const { channels } = useSockets();

	useEffect(() => {
		channels?.on("member_joined", (channel: ChannelType, member: ChannelMemberType) => {
			if (authenticatedUser?.user.username === member.user.username) {
				sonner.success("Channels", {
					description: `You have joined channel ${channel.name}`,
				});

				channelsDispatch({
					type: "ADD_CHANNEL",
					payload: channel,
				});
			} else {
				sonner.success("Channels", {
					description: `${member.user.nickname} has joined channel ${channel.name}`,
				});

				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}

			// setChannel(channel);
		});

		channels?.on("member_left", (channel: ChannelType, member: ChannelMemberType) => {
			console.log(channel, member);

			if (authenticatedUser?.user.username === member.user.username) {
				sonner.info("Channels", {
					description: `You have left channel ${channel.name}`,
				});

				console.log("CHANNEL ", channel, " MEMEBER ", member);

				channelsDispatch({
					type: "REMOVE_CHANNEL",
					payload: channel,
				});
			} else {
				sonner.info("Channels", {
					description: `${member.user.nickname} has left channel ${channel.name}`,
				});

				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}

			// setChannel(channel);
		});
	}, [channels, authenticatedUser, channelsDispatch]);
};

export default useChannelMembersUpdate;
