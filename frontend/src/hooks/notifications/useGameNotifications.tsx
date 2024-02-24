import { GameMatchType } from "@/lib/types/game/game-match";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
import { useEffect } from "react";
import useGame from "../game/useGame";
import { AchievementsUpdateType } from "@/lib/types/achievement/achievements-update";
import { AchievementData } from "./useAchievementNotifications";
import { useToast } from "@/components/ui/use-toast";
import { GameRequestType } from "@/lib/types/game/game-request";

const useGameNotifications = () => {
	const { game } = useGame();
	const { toast } = useToast();

	useEffect(() => {
		game?.on("achievement_awarded", (args: AchievementsUpdateType) => {
			toast({
				title: "Achievements",
				description: (
					<AchievementData
						name={args.latest.name}
						unlockedAt={args.latest.unlockedAt}
						brief={args.latest.brief ?? ""}
						description={args.latest.description ?? ""}
					/>
				),
			});
		});

		game?.on("player_disconnected", ({ target }: GameRequestType) => {
			toast({
				title: "Game",
				className: "rounded",
				description: `The player you challenged "${target.nickname}" has left the game page!`,
			});
		});

		game?.on("opponent_disconnected", (leaver: GameMatchPlayerType, match: GameMatchType) => {
			toast({
				title: "Game",
				description: `The player you challenged "${leaver.user.nickname}" has disconnected!`,
			});
		});
	}, [game, toast]);
};

export default useGameNotifications;
