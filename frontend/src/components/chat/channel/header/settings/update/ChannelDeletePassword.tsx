"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelType } from "@/lib/types/channel/channel";

export interface ChannelDeletePasswordProps {
	channel: ChannelType;
	className?: string;
}

const ChannelDeletePassword = ({ channel, className }: ChannelDeletePasswordProps) => {
	const { channels } = useSockets();
	return (
		<Button
			className={className}
			variant="destructive"
			disabled={channel.status === "PUBLIC" || channel.status === "PRIVATE"}
			onClick={() => {
				channels?.emit("delete_channel_password", channel.name);
			}}
		>
			Delete
		</Button>
	);
};

export default ChannelDeletePassword;
