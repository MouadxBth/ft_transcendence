"use client";

import ChannelMemberListSkeleton from "../ChannelMemberListSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMemberListItem from "./ChannelMemberListItem";
import { useChannels } from "@/hooks/chat/channel/useChannels";

export interface ChannelMemberListProps {
	name: string;
}

const ChannelMemberList = ({ name }: ChannelMemberListProps) => {
	const { channels, isLoading } = useChannels();
	const channel = channels.find((value) => value.name === name)!;

	if (isLoading) {
		return <ChannelMemberListSkeleton />;
	}

	return (
		<ScrollArea>
			<div className=" max-h-34">
				{channel?.members.map((member) => (
					<ChannelMemberListItem
						key={member.user.username}
						member={member}
						owner={channel.owner.username === member.user.username}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default ChannelMemberList;
