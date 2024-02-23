"use client";

import ProfileOnlineStatus from "@/components/profile/info/avatar/ProfileOnlineStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import Link from "next/link";
import ChannelMemberStatus from "./ChannelMemberStatus";
import ChannelMemberChallenge from "./ChannelMemberChallenge";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export interface ChannelMemberListItemBaseProps {
	member: ChannelMemberType;
	owner: boolean;
}

const ChannelMemberListItemBase = ({ member, owner }: ChannelMemberListItemBaseProps) => {
	const { authenticatedUser } = useAuthentication();
	const { avatar, username, nickname } = member.user;
	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;
	return (
		<div className="rounded flex items-center justify-center space-x-2  w-full bg-secondary p-2 relative">
			<Link
				href={`/profile/${username}`}
				className="rounded flex items-center justify-center space-x-2  w-full bg-secondary p-2 relative"
			>
				<ProfileOnlineStatus
					username={username}
					className="absolute top-2 left-2"
				/>

				<ChannelMemberStatus
					member={member}
					owner={owner}
					className="absolute top-8 left-0"
				/>
				<Avatar className="h-16 w-16">
					<AvatarImage
						className="object-cover"
						src={avatarSource}
						alt={nickname!}
					/>
					<AvatarFallback>{nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col items-start">
					<div className="text-md">{nickname}</div>
					<div className="text-xs">@{username}</div>
					<div className="text-xs flex space-x-2 text-muted-foreground">
						{/* <span>{firstName}</span>
						<span>{lastName}</span> */}
					</div>
				</div>
			</Link>
			{authenticatedUser?.user.username !== member.user.username && (
				<ChannelMemberChallenge
					name={member.user.username}
					className="rounded"
				/>
			)}
		</div>
	);
};

export default ChannelMemberListItemBase;
