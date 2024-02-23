"use client";

import Loading from "@/components/ui/loading";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";
import { useEffect, useState } from "react";
import { FriendType } from "@/lib/types/friend/friend";
import GameForbidden from "@/components/game/forbidden/GameForbidden";

interface GamePageProps {
	children: React.ReactNode;
	params: { id: string };
}

export default function gamePage(Component: any) {
	return function GamePage(props: GamePageProps) {
		const { authenticatedUser } = useAuthentication();
		const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(
			authenticatedUser?.user.username!
		);
		const [friends, setFriends] = useState<FriendType[]>([]);
		const [loading, setLoading] = useState(true);

		const friend = friends.find(
			(element) => element.username.toLowerCase() === props.params.id.toLowerCase()
		);

		useEffect(() => {
			if (isLoading) {
				setLoading(true);
				return;
			}

			if (data) setFriends(data);
			setLoading(false);
		}, [data, isLoading, isError, isSuccess, error]);

		if (loading) {
			return (
				<div className="w-full h-full flex items-center justify-center">
					<Loading />
				</div>
			);
		}

		if (!friend) {
			return <GameForbidden />;
		}

		return <Component {...props} />;
	};
}
