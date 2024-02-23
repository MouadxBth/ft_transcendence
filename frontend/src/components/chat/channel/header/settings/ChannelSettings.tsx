"use client";

import { Button } from "@/components/ui/button";
import useChannel from "@/hooks/chat/channel/useChannel";
import { useEffect, useState } from "react";
import { ChannelType } from "@/lib/types/channel/channel";
import ChannelForbidden from "../../forbidden/ChannelForbidden";
import ChannelMembers from "./ChannelMembers";
import ChannelInvite from "./invite/ChannelInvite";
import ChannelQuit from "./ChannelQuit";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import ChannelBan from "./ban/ChannelBan";
import ChannelKick from "./kick/ChannelKick";
import ChannelPromote from "./promote/ChannelPromote";
import ChannelMute from "./mute/ChannelMute";
import { cn } from "@/lib/utils";
import ChannelUpdate from "./update/ChannelUpdate";

export interface ChannelSettingsProps {
	name: string;
	className?: string;
}

const ChannelSettings = ({ name, className }: ChannelSettingsProps) => {
	const { data, isLoading } = useChannel(name);
	const { authenticatedUser } = useAuthentication();
	const [channel, setChannel] = useState<ChannelType | undefined>(undefined);
	const [loading, setLoading] = useState(true);

	const member = channel?.members.find(
		(element) => element.user.username === authenticatedUser?.user.username
	);

	const isOwner = channel?.owner.username === authenticatedUser?.user.username;
	const isAdmin = isOwner || (member?.admin ?? false);

	useEffect(() => {
		if (isLoading) return;

		if (data) setChannel(data);

		setLoading(false);
	}, [isLoading, data]);

	if (loading)
		return (
			<Button
				variant="outline"
				className="rounded"
				disabled
			>
				Loading...
			</Button>
		);

	if (!channel) return <ChannelForbidden />;

	return (
		<div className={cn("", className)}>
			<ChannelMembers
				channel={channel}
				className="rounded text-xs px-2"
			/>

			<ChannelPromote
				name={name}
				isOwner={isOwner}
				className="rounded text-xs px-2"
			/>

			<ChannelInvite
				name={name}
				status={channel.status}
				isAdmin={isAdmin}
				className="rounded text-xs px-2"
			/>

			<ChannelBan
				name={name}
				isAdmin={isAdmin}
				className="rounded text-xs px-2"
			/>

			<ChannelMute
				name={name}
				isAdmin={isAdmin}
				className="rounded text-xs px-2"
			/>

			<ChannelKick
				name={name}
				isAdmin={isAdmin}
				className="rounded text-xs px-2"
			/>

			<ChannelUpdate
				channel={channel}
				isOwner={isOwner}
				className="rounded text-xs px-2"
			/>

			<ChannelQuit
				name={name}
				className="rounded text-xs px-2"
			/>
		</div>
	);
};

export default ChannelSettings;
