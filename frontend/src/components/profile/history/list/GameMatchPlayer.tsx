import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
import { cn } from "@/lib/utils";

export interface GameMatchPlayerProps {
	className?: string;
	loading?: boolean;
	player: GameMatchPlayerType;
}

const GameMatchPlayer = ({ className, loading, player }: GameMatchPlayerProps) => {
	const { winner, draw, score, user } = player;
	const { nickname, avatar, firstName, lastName } = user;

	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<div className={cn("flex flex-col justify-center items-center space-y-2", className)}>
			<Avatar
				className={cn("h-16 w-16 border-amber-500 border-2", {
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
						Score: <span className="text-white">{score}</span>
					</div>
					<div
						className={cn("text-sm", {
							"text-green-500": winner,
							"text-red-500": !winner,
							"text-muted-foreground": draw,
						})}
					>
						{winner ? "Winner" : draw ? "Draw" : "Loser"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameMatchPlayer;
