"use client";

import { Textarea } from "@/components/ui/textarea";
import useSockets from "@/hooks/socket/useSockets";
import React from "react";

export interface ChannelInputProps {
	channel: string;
}

const ChannelInput = ({ channel }: ChannelInputProps) => {
	const { channels } = useSockets();
	return (
		<Textarea
			className="max-h-80 h-14 resize-none"
			placeholder="Type a message..."
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
