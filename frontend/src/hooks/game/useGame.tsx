import { Sonner } from "@/components/ui/sonner";
import useSockets from "../socket/useSockets"
import { toast as sonner } from "sonner";
import { useEffect } from "react";

interface matchDto {
	player1: string,
	player2: string,
}

interface matchErrorDto {
	error: string,
	message: string,
	data: matchDto,
}

const useGame = () => {
	const { game } = useSockets();
	let matchDetails: matchDto;

	const refuseRequest = () => {
		game?.emit("deny_request", matchDetails);
	}

	const acceptRequest = () => {
		game?.emit("accept_request", matchDetails);
	}

	function gameRequestHandler(data: any) {
		matchDetails = data;
		console.log("Received a game request!", data);
		sonner("Game Request", {
			duration: 100000000,
			action: {
				label: "Accept",
				onClick: acceptRequest,
			},
			cancel: {
				label: "Refuse",
				onClick: refuseRequest,
			}
		})
	}

	function requestDenied(dto: matchDto) {
		sonner(`${dto.player2} didn't accept your game request.`)
	}

	function requestAccepted(dto: matchDto) {
		sonner(`${dto.player2} accepted your game request!`)
	}

	function errorHandler(error: matchErrorDto) {
		sonner(`Error: ${error.message}`);
	}

	useEffect(() => {
		game?.on("game_request", gameRequestHandler);
		game?.on("request_denied", requestDenied);
		game?.on("request_accepted", requestAccepted);
		game?.on("error", errorHandler);
	}, [game])
}

export default useGame;