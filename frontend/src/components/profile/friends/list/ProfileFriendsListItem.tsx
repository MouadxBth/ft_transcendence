import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FriendType } from "@/lib/types/friend";
import { User } from "@/lib/types/user";
import Link from "next/link";
import ProfileOnlineStatus from "../../info/avatar/ProfileOnlineStatus";

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
				className="flex space-x-2  w-full bg-black p-2 rounded-2xl justify-between items-center"
			>
				<div className="flex items-center space-x-3">
					<Avatar className="h-14 w-14">
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
				</div>
				<ProfileOnlineStatus
					username={username}
					className="h-6 items-center w-14 flex justify-center"
				/>
			</Link>
			<Separator className="my-1" />
		</>
	);
};

export default ProfileFriendsListItem;
