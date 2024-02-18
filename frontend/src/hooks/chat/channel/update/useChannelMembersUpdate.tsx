import { Dispatch, useEffect } from "react";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { ChannelsAction } from "../useChannelsState";
import { ChannelType } from "@/lib/types/channel/channel";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import useSockets from "@/hooks/socket/useSockets";
import { useRouter } from "next/navigation";
import { ChannelOperationResultType } from "@/lib/types/channel/channel-operation-result";

const useChannelMembersUpdate = (channelsDispatch: Dispatch<ChannelsAction>) => {
	const { authenticatedUser } = useAuthentication();
	const { channels } = useSockets();
	const { push } = useRouter();

	useEffect(() => {
		channels?.on("member_joined", (channel: ChannelType, member: ChannelMemberType) => {
			if (authenticatedUser?.user.username === member.user.username) {
				return channelsDispatch({
					type: "ADD_CHANNEL",
					payload: channel,
				});
			}

			channelsDispatch({
				type: "UPDATE_CHANNEL",
				payload: channel,
			});
		});

		channels?.on("member_left", (channel: ChannelType, member: ChannelMemberType) => {
			if (
				authenticatedUser?.user.username === member.user.username ||
				channel.owner.username === member.user.username
			) {
				return channelsDispatch({
					type: "REMOVE_CHANNEL",
					payload: channel,
				});
			}

			channelsDispatch({
				type: "UPDATE_CHANNEL",
				payload: channel,
			});
		});

		channels?.on(
			"promoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}
		);

		channels?.on(
			"demoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}
		);

		channels?.on(
			"muted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}
		);

		channels?.on(
			"unmuted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				channelsDispatch({
					type: "UPDATE_CHANNEL",
					payload: channel,
				});
			}
		);
	}, [channels, authenticatedUser, channelsDispatch, push]);
};

export default useChannelMembersUpdate;
