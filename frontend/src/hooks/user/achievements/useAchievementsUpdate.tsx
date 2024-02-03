import useSockets from "@/hooks/socket/useSockets";
import { AchievementsUpdateType } from "@/lib/types/achievement/achievements-update";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { AchievementType } from "@/lib/types/achievement/achievement";

const useAchievementsUpdate = (
	setAchievements: Dispatch<SetStateAction<AchievementType[]>>,
	username?: string
) => {
	const { authenticatedUser } = useAuthentication();
	const { notifications } = useSockets();
	const target = username ?? authenticatedUser?.user.username!;

	useEffect(() => {
		notifications?.on("achievement_awarded", (args: AchievementsUpdateType) => {
			if (target === args.username) setAchievements(args.achievements);
		});
	}, [notifications, target, setAchievements]);
};

export default useAchievementsUpdate;
