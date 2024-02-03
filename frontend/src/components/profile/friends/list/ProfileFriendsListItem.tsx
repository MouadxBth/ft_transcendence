import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ProfileOnlineStatus from "../../info/avatar/ProfileOnlineStatus";
import { FriendType } from "@/lib/types/friend/friend";

const ProfileFriendsListItem = ({
	username,
	nickname,
	firstName,
	lastName,
	avatar,
}: FriendType) => {
	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<>
			<Link
				href={`/profile/${username}`}
				className="flex items-center justify-center space-x-2  w-full bg-black p-2 relative"
			>
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
					<AvatarFallback>{nickname.toUpperCase().slice(0, 2)}</AvatarFallback>
				</Avatar>
				<div className="flex flex-col items-start">
					<div className="text-md">{nickname}</div>
					<div className="text-xs">@{username}</div>
					<div className="text-xs flex space-x-2 text-muted-foreground">
						<span>{firstName}</span>
						<span>{lastName}</span>
					</div>
				</div>
			</Link>
			<Separator className="my-1" />
		</>
	);
};

export default ProfileFriendsListItem;
