import useSockets from "@/hooks/socket/useSockets";
import { GameMatchType } from "@/lib/types/game/game-match";
import { GamePlayerStatus } from "@/lib/types/game/game-match-player";
import { GameRequestType } from "@/lib/types/game/game-request";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";

const useGameRequestUpdate = (
	setStatus: Dispatch<SetStateAction<GamePlayerStatus>>,
	setGame: Dispatch<SetStateAction<GameMatchType | undefined>>,
	setRequest: Dispatch<SetStateAction<GameRequestType | undefined>>
) => {
	const { notifications } = useSockets();
	const queryClient = useQueryClient();

	useEffect(() => {
		notifications?.on("joined_queue", () => {
			setStatus("waiting");
		});

		notifications?.on("opponent_found", (game: GameMatchType) => {
			setGame(game);
			setStatus("started");
		});

		notifications?.on("sent_request_update", (args: GameRequestType[]) => {
			setRequest(args[0]);
			setStatus("waiting");
		});

		notifications?.on("received_requests_update", (_: GameRequestType[]) => {
			queryClient.invalidateQueries({
				queryKey: ["received-game-requests"],
			});
		});

		notifications?.on("match_request_accepted", (game: GameMatchType) => {
			setRequest(undefined);
			setGame(game);
			setStatus("started");
		});

		notifications?.on("accepted_match_request", (game: GameMatchType) => {
			queryClient.invalidateQueries({
				queryKey: ["received-game-requests"],
			});

			setGame(game);
			setStatus("started");
		});

		notifications?.on("match_request_declined", (args: GameRequestType) => {
			setRequest(undefined);
			setStatus("lobby");
		});

		notifications?.on("declined_match_request", (args: GameRequestType) => {
			queryClient.invalidateQueries({
				queryKey: ["received-game-requests"],
			});
		});

		notifications?.on("challenger_disconnected", (args: GameRequestType) => {
			queryClient.invalidateQueries({
				queryKey: ["received-game-requests"],
			});
		});

		notifications?.on("opponent_disconnected", (args: GameRequestType[]) => {
			setRequest(undefined);
			setStatus("lobby");
		});
	}, [notifications, queryClient, setStatus, setGame, setRequest]);
};

export default useGameRequestUpdate;
