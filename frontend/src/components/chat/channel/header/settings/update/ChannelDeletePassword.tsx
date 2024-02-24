"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useSockets from "@/hooks/socket/useSockets";
import { ChannelType } from "@/lib/types/channel/channel";
import { cn } from "@/lib/utils";

export interface ChannelDeletePasswordProps {
	channel: ChannelType;
	className?: string;
}

const ChannelDeletePassword = ({ channel, className }: ChannelDeletePasswordProps) => {
	const { channels } = useSockets();
	return (
		<>
			<Label htmlFor="delete">Delete your channel&apos;s password:</Label>
			<Button
				id="delete"
				className={cn("w-full", className)}
				variant="destructive"
				disabled={channel.status === "PUBLIC" || channel.status === "PRIVATE"}
				onClick={() => {
					channels?.emit("delete_channel_password", channel.name);
				}}
			>
				Delete
			</Button>
		</>
	);
};

export default ChannelDeletePassword;
