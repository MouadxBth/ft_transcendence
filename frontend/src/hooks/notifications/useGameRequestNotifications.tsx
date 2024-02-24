import { useEffect } from "react";
import { useAuthentication } from "../authentication/useAuthentication";
import useSockets from "../socket/useSockets";
import { GameRequestType } from "@/lib/types/game/game-request";
import { GameRequestPlayerType } from "@/lib/types/game/game-request-player";
import { GameMatchType } from "@/lib/types/game/game-match";
import { useToast } from "@/components/ui/use-toast";

const useGameRequestNotifications = () => {
	const { notifications } = useSockets();
	const { authenticatedUser } = useAuthentication();
	const { toast } = useToast();

	const myUsername = authenticatedUser?.user.username!;

	useEffect(() => {
		notifications?.on("joined_queue", () => {
			toast({
				title: "Game",
				className: "rounded",
				description: `You have successfully joined the queue!`,
			});
		});

		notifications?.on("opponent_found", (game: GameMatchType) => {
			const opponent =
				game.player1?.user.username === myUsername
					? game.player2?.user.nickname
					: game.player1?.user.nickname;

			toast({
				title: "Game",
				className: "rounded",
				description: `You have been matched against "${opponent}"!`,
			});
		});

		notifications?.on(
			"challenger_disconnected",
			(sender: GameRequestPlayerType, _: GameRequestType[]) => {
				toast({
					title: "Game",
					className: "rounded",
					description: `Your challenger "${sender.nickname}" has disconnected!`,
				});
			}
		);

		notifications?.on("opponent_disconnected", ({ target }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `The player you challenged "${target.nickname}" has disconnected!`,
			});
		});

		notifications?.on("sent_match_request", ({ superMatch, target }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `You've sent a ${superMatch ? "Super" : "Classic"} Game request to ${target.nickname}`,
			});
		});

		notifications?.on("receive_match_request", ({ superMatch, sender }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `${sender.nickname} sent you a ${superMatch ? "Super" : "Classic"} Game request!`,
			});
		});

		notifications?.on("match_request_accepted", ({ player2 }: GameMatchType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `Your opponent "${player2?.user.nickname}" has accepted your match request!`,
			});
		});

		notifications?.on("accepted_match_request", ({ player1 }: GameMatchType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `You have accepted "${player1?.user.nickname}'s" match request!`,
			});
		});

		notifications?.on("match_request_declined", ({ target }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `Your opponent "${target.nickname}" has declined your match request!`,
			});
		});

		notifications?.on("declined_match_request", ({ sender }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `You have declined "${sender.nickname}'s" match request!`,
			});
		});
	}, [notifications, myUsername, toast]);
};

export default useGameRequestNotifications;
