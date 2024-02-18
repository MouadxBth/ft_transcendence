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

interface GameQueueProps {
	opponent: string;
	setStatus: (stat: string) => void;
}

const GameQueue = ({ opponent, setStatus }: GameQueueProps) => {
	const { push } = useRouter();
	const { game } = useSockets();

	const handleAcceptRequest = () => {
		push("/chat");
		setStatus("confirmed");
	};

	const handleDenyRequest = () => {
		setStatus("choose");
	};

	useEffect(() => {
		game?.on("request_accepted", handleAcceptRequest);
		game?.on("request_denied", handleDenyRequest);
	});

	const { authenticatedUser } = useAuthentication();
	const avatar = authenticatedUser?.user.avatar;
	const { data } = useSingleUserSearch(opponent);
	const [isLoading, setIsLoading] = useState(true); //try true and false to see the difference

	console.log(opponent, data);

	return (
		<>
			<Card className="w-1/2 h-1/2 flex flex-col items-center justify-center">
				<CardHeader>
					{isLoading ? (
						<GameWaitingTitle
							opponent={opponent}
							data={data}
						/>
					) : (
						<GameStartingTitle />
					)}
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
						isLoading={isLoading}
						opponent={opponent}
						data={data}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default GameQueue;
