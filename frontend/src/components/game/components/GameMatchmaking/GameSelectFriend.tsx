import { CardContent } from "@/components/ui/card";
import { Popover } from "@/components/ui/popover";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useFriends from "@/hooks/user/useFriends";
import FriendList from "./FriendList";

const GameSelectFriend = () => {
	const { authenticatedUser } = useAuthentication();
	const username = authenticatedUser!.user.username;
	const { data, isLoading, isSuccess, isError, error } = useFriends(username);
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (isError) {
		return <p>Error: {error?.message}</p>;
	}

	if (isSuccess) {
		console.log("Friends:", data);
	}
	return (
		<div>
			<CardContent className="flex flex-col items-center justify-center space-y-3">
				<p className="text-xs text-muted-foreground">Leave empty for auto matchmaking</p>
				<Popover>
					<FriendList
						user={authenticatedUser!.user}
						friends={data}
					/>
				</Popover>
			</CardContent>
		</div>
	);
};

export default GameSelectFriend;
