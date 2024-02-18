import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useSingleUserSearch from "@/hooks/user/useSingleUserSearch";
import { useEffect, useState } from "react";
import useSockets from "@/hooks/socket/useSockets";
import { useRouter } from "next/navigation";
import GameWaitingTitle from "./GameWaitingTitle";
import GameStartingTitle from "./GameStartingTitle";
import GameFristPlayer from "./GameFristPlayer";
import GameSecondPlayer from "./GameSecondPlayer";
import { matchDto } from "@/hooks/game/useGame";
import GameSecondPlayerLoading from "./GameSecondPlayerLoading";

interface GameQueueProps {
	opponent: string;
	setStatus: (stat: string) => void;
}

interface RandomState {
	username: string,
	loading: boolean,
}

const GameQueue = ({ opponent, setStatus }: GameQueueProps) => {
	const { authenticatedUser } = useAuthentication();
	const avatar = authenticatedUser?.user.avatar;
	const { push } = useRouter();
	const { game } = useSockets();
	const [randomOpponent, setRandomOpponent] = useState<RandomState>({loading: true, username: ''}); //try true and false to see the difference

	const handleAcceptRequest = () => {
		push("/chat"); // to be modified later
		setStatus("confirmed");
	};

	const handleDenyRequest = () => {
		setStatus("choose");
	};
	
	const handleOpponentFound = (data: matchDto) => {
		setRandomOpponent({username: data.player2, loading: false});
	}

	useEffect(() => {
		game?.on("request_accepted", handleAcceptRequest);
		game?.on("request_denied", handleDenyRequest);
		game?.on("opponent_found", handleOpponentFound);
	}, [game]);

	console.log("your opponent", opponent);

	if (opponent) return (
		<>
			<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
				<CardHeader>
					<GameWaitingTitle
						opponent={opponent}
					/>
				</CardHeader>
				<CardContent className="flex justify-around items-center space-x-4 w-full h-full">
					<GameFristPlayer
						avatar={avatar}
						authenticatedUser={authenticatedUser}
					/>
					<div>
						<h1 className="text-3xl">VS</h1>
					</div>
					<GameSecondPlayer
						opponent={opponent}
					/>
				</CardContent>
			</Card>
		</>
	)
	else if (randomOpponent.loading) return  (
		<>
		<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
			<CardHeader>
				<GameWaitingTitle
					opponent={opponent}
				/>
			</CardHeader>
			<CardContent className="flex justify-around items-center space-x-4 w-full h-full">
				<GameFristPlayer
					avatar={avatar}
					authenticatedUser={authenticatedUser}
				/>
				<div>
					<h1 className="text-3xl">VS</h1>
				</div>
				<GameSecondPlayerLoading />
			</CardContent>
		</Card>
	</>
	)
	else return (
		<>
		<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
			<CardHeader>
				<GameWaitingTitle
					opponent={opponent}
				/>
			</CardHeader>
			<CardContent className="flex justify-around items-center space-x-4 w-full h-full">
				<GameFristPlayer
					avatar={avatar}
					authenticatedUser={authenticatedUser}
				/>
				<div>
					<h1 className="text-3xl">VS</h1>
				</div>
				<GameSecondPlayer
					opponent={randomOpponent.username}
				/>
			</CardContent>
		</Card>
	</>
)
};

export default GameQueue;
