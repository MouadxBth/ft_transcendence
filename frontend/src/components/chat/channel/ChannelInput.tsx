"use client";

import { Textarea } from "@/components/ui/textarea";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { useChannels } from "@/hooks/chat/channel/useChannels";
import useSockets from "@/hooks/socket/useSockets";
import React from "react";

export interface ChannelInputProps {
	channel: string;
}

const ChannelInput = ({ channel }: ChannelInputProps) => {
	const { channels } = useSockets();
	const { authenticatedUser } = useAuthentication();
	const result = useChannels();
	const channelResult = result.channels.find((element) => element.name === channel)!;
	const member = channelResult.members.find(
		(element) => element.user.username === authenticatedUser?.user.username
	)!;

	return (
		<Textarea
			className="max-h-80  resize-none"
			placeholder="Type a message..."
			disabled={result.isLoading || member.muted}
			callback={(value) => {
				console.log(value);
				if (/^\s*$/.test(value)) return;
				channels?.emit("send_message", {
					channelName: channel,
					message: value,
				});
			}}
		/>
	);
};

export default ChannelInput;
