import useSockets from "@/hooks/socket/useSockets";
import { GameMatchPlayerType, GamePlayerStatus } from "@/lib/types/game/game-match-player";
import { GameRequestType } from "@/lib/types/game/game-request";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import useGame from "../useGame";
import { GameMatchType } from "@/lib/types/game/game-match";

const useGameUpdate = (
	setStatus: Dispatch<SetStateAction<GamePlayerStatus>>,
	setRequest: Dispatch<SetStateAction<GameRequestType | undefined>>
) => {
	const { notifications } = useSockets();
	const { game } = useGame();
	const queryClient = useQueryClient();

	useEffect(() => {
		notifications?.on("challenger_disconnected", (args: GameRequestType) => {
			queryClient.invalidateQueries({
				queryKey: ["received-game-requests"],
			});
		});

		game?.on("player_disconnected", (args: GameRequestType) => {
			setRequest(undefined);
			setStatus("lobby");
		});

		game?.on("opponent_disconnected", (leaver: GameMatchPlayerType, match: GameMatchType) => {
			setStatus("lobby");
			setRequest(undefined);
			queryClient.invalidateQueries({
				queryKey: ["sent-game-requests"],
			});

			queryClient.invalidateQueries({
				queryKey: ["user-level", match.player1?.user.username],
			});

			queryClient.invalidateQueries({
				queryKey: ["user-level", match.player2?.user.username],
			});

			notifications?.emit("update_online_status", match.player1?.user.username);
			notifications?.emit("update_online_status", match.player2?.user.username);
		});
	}, [game, notifications, queryClient, setStatus, setRequest]);
};

export default useGameUpdate;
