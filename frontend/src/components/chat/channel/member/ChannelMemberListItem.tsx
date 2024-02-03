import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MoreVerticalIcon } from "lucide-react";
import ChannelMemberMenu from "../ChannelMemeberMenu";
import { channel } from "diagnostics_channel";

export interface ChannelMemberListItemProps {
	username: string;
	avatar: string;
	channel: string,
}

const ChannelMemberListItem = ({
	username,
	avatar,
	channel
}: ChannelMemberListItemProps) => {
	return (
		<>
			<div className="flex flex-row">
				<Avatar>
					<AvatarImage
						src={avatar}
						alt={username}
					/>
					<AvatarFallback>{username.substring(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col mx-2 justify-center w-full">
					{username}
				</div>
				<div className="flex flex-col justify-center">
					<ChannelMemberMenu member={username} channel={channel}/>
				</div>
			</div>
			<Separator className="border my-2" />
		</>
	);
};

export default ChannelMemberListItem;
