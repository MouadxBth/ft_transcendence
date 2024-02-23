import { toast as sonner } from "sonner";
import { GameMatchType } from "@/lib/types/game/game-match";
import { GameMatchPlayerType } from "@/lib/types/game/game-match-player";
import { useEffect } from "react";
import useGame from "../game/useGame";
import { AchievementsUpdateType } from "@/lib/types/achievement/achievements-update";
import { AchievementData } from "./useAchievementNotifications";

const useGameNotifications = () => {
	const { game } = useGame();

	useEffect(() => {
		game?.on("achievement_awarded", (args: AchievementsUpdateType) => {
			sonner.success("Achievements", {
				important: true,
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

		game?.on("opponent_disconnected", (leaver: GameMatchPlayerType, match: GameMatchType) => {
			sonner.success("Game", {
				description: `The player you challenged "${leaver.user.nickname}" has disconnected!`,
			});
		});
	}, [game]);
};

export default useGameNotifications;
