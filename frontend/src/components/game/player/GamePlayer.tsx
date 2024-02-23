"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { GameRequestPlayerType } from "@/lib/types/game/game-request-player";
import { cn } from "@/lib/utils";

export interface GamePlayerProps {
	className?: string;
	loading?: boolean;
	player?: GameRequestPlayerType;
}

const GamePlayer = ({ className, loading, player }: GamePlayerProps) => {
	const { authenticatedUser } = useAuthentication();
	const { nickname, avatar, firstName, lastName, eloRating, level } =
		player ?? authenticatedUser?.user!;

	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<div className={cn("flex flex-col justify-center items-center space-y-2", className)}>
			<Avatar
				className={cn("h-32 w-32 border-amber-500 border-2", {
					"animate-pulse": loading,
				})}
			>
				<AvatarImage
					className="object-cover"
					src={avatarSource}
				/>
				<AvatarFallback>{nickname?.toUpperCase().slice(0, 2)}</AvatarFallback>
			</Avatar>
			<div
				className={cn("flex flex-col items-center", {
					"animate-pulse": loading,
				})}
			>
				<p>{nickname}</p>
				<p className="text-sm text-muted-foreground">{`${firstName} ${lastName}`}</p>
				<div className="flex space-x-2">
					<div className="text-sm text-muted-foreground">
						Level: <span className="text-white">{level}</span>
					</div>
					<div className="text-sm text-muted-foreground">
						Rating: <span className="text-white">{eloRating}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GamePlayer;
