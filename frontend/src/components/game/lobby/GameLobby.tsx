import { useSearchParams } from "next/navigation";
import GameRequests from "../requests/GameRequests";
import GameMatchmaking from "../matchmaking/GameMatchmaking";
import GameLeaderboard from "../leaderboard/GameLeaderboard";

const GameLobby = () => {
	const searchParams = useSearchParams();
	const user = searchParams.get("user");

	return (
		<>
			<GameRequests className="" />
			<GameMatchmaking defaultSelection={user ?? undefined} />
			<GameLeaderboard className="col-span-2" />
		</>
	);
};

export default GameLobby;
