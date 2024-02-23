import ProfileOnlineStatus from "@/components/profile/info/avatar/ProfileOnlineStatus";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Rank from "@/components/ui/rank";
import { Separator } from "@/components/ui/separator";
import { LeaderboardMemberType } from "@/lib/types/game/leaderboard-member";
import Link from "next/link";

const GameLeaderboardListItem = ({
	username,
	nickname,
	firstName,
	lastName,
	avatar,
	eloRating,
	index,
}: LeaderboardMemberType & { index: number }) => {
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

				<Rank rank={index} />

				<Avatar className="h-16 w-16">
					<AvatarImage
						className="object-cover"
						src={avatarSource}
						alt={nickname!}
					/>
					<AvatarFallback>{nickname?.toUpperCase().slice(0, 2)}</AvatarFallback>
				</Avatar>

				<div className="flex flex-col items-start">
					<div className="flex items-center space-x-1">
						<div className="text-md">{nickname}</div>
						<div className="text-xs">{`Rating: ${eloRating}`}</div>
					</div>
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

export default GameLeaderboardListItem;
