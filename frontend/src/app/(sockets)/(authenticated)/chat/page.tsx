"use client";
import ProfileFriendsCard from "@/components/profile/friends/ProfileFriendsCard";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";
import { FriendType } from "@/lib/types/friend/friend";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import MatchmakingTitle from "@/components/game/components/GameMatchmaking/MatchmakingTitle";
import GameMatchmaking from "@/components/game/components/GameMatchmaking/GameMatchmaking";
import InviteFriendToGame from "@/components/game/invitetogame/InviteFriendToGame";

const Page = () => {
	const { authenticatedUser } = useAuthentication();
	const username = authenticatedUser!.user.username;
	const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(username);
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState<FriendType[]>([]);
	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setFriends(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);
	return (
		<div className="w-full h-full flex flex-col justify-center items-center space-y-12">
			{loading ? <p>Loading...</p> : null}
			{friends.map((friend) => (
				<Dialog key={friend.username}>
					<DialogTrigger>Invite {friend.username}</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								<MatchmakingTitle />
							</DialogTitle>
							<DialogDescription>
								<InviteFriendToGame invitedFriend={friend} />
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			))}
		</div>
	);
};

export default Page;
