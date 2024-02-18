import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { matchDto } from "@/hooks/game/useGame";
import useSockets from "@/hooks/socket/useSockets";
import useSingleUserSearch from "@/hooks/user/useSingleUserSearch";
import { User } from "@/lib/types/user/user";
import { useEffect, useState } from "react";

export interface GameSecondPlayerProps {
	opponent: string;
}

const GameSecondRandomPlayer = ({ opponent }: GameSecondPlayerProps) => {

	const { data } = useSingleUserSearch(opponent);

	return (
		<div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
			<Avatar className="h-32 w-32 text-white border-amber-500 border-2">
				<AvatarImage
					className="object-cover"
					src={
						data?.avatar
							? data?.avatar.startsWith("http")
								? data?.avatar
								: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${data?.avatar}`
							: ""
					}
				/>
				<AvatarFallback>{data?.nickname!.toUpperCase().slice(0, 2)}</AvatarFallback>
			</Avatar>
			<p>{data?.nickname}</p>
		</div>
	);
};

export default GameSecondRandomPlayer;
