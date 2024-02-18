"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useChannels } from "@/hooks/chat/channel/useChannels";
import ChannelMemberListSkeleton from "../ChannelMemberListSkeleton";
import ChannelMemberInviteListItem from "./ChannelMemberInviteListItem";

export interface ChannelMemberInviteListProps {
	name: string;
}

const ChannelMemberInviteList = ({ name }: ChannelMemberInviteListProps) => {
	const { channels, isLoading } = useChannels();
	const channel = channels.find((value) => value.name === name)!;

	if (isLoading) {
		return <ChannelMemberListSkeleton />;
	}

	return (
		<ScrollArea>
			<div className=" max-h-28">
				{channel?.members.map((member) => (
					<ChannelMemberInviteListItem
						key={member.user.username}
						member={member}
						owner={channel.owner.username === name}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default ChannelMemberInviteList;
