import ProfileOnlineStatus from "@/components/profile/info/avatar/ProfileOnlineStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommandItem } from "@/components/ui/command";
import { User } from "@/lib/types/user/user";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

export interface UserSelectionListItemProps {
	user: User;
	select: (value: string) => void;
	selected: string | undefined;
}

const UserSelectionListItem = ({ user, select, selected }: UserSelectionListItemProps) => {
	const { username, nickname, avatar, firstName, lastName } = user;

	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<CommandItem
			value={username}
			onSelect={() => select(username)}
			className="flex items-center justify-center space-x-2  w-full bg-black p-2 relative"
		>
			<Check className={cn("mr-1 h-3 w-3", username === selected ? "opacity-100" : "opacity-0")} />

			<ProfileOnlineStatus
				username={username}
				className="absolute top-2 left-2"
			/>
			<Avatar className="h-16 w-16">
				<AvatarImage
					className="object-cover"
					src={avatarSource}
					alt={nickname!}
				/>
				<AvatarFallback>{nickname!.toUpperCase().slice(0, 2)}</AvatarFallback>
			</Avatar>
			<div className="flex flex-col items-start">
				<div className="text-md">{nickname}</div>
				<div className="text-xs">@{username}</div>
				<div className="text-xs flex space-x-2 text-muted-foreground">
					<span>{firstName}</span>
					<span>{lastName}</span>
				</div>
			</div>
		</CommandItem>
	);
};

export default UserSelectionListItem;
