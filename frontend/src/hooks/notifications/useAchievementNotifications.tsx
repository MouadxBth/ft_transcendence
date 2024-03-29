import useSockets from "@/hooks/socket/useSockets";
import { AchievementsUpdateType } from "@/lib/types/achievement/achievements-update";
import { useEffect } from "react";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { formattedDate } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export const AchievementData = ({
	name,
	unlockedAt,
	brief,
	description,
}: {
	name: string;
	unlockedAt: string;
	brief: string;
	description: string;
}) => {
	return (
		<div className="flex flex-col">
			<div className="flex items-center space-x-2 pb-2">
				<div className="font-bold">{name}</div>
				<div className="text-xs">{formattedDate(unlockedAt)}</div>
			</div>
			<div className="text-xs">{brief}</div>
			<div className="text-xs">{description}</div>
		</div>
	);
};

const useAchievementNotification = () => {
	const { authenticatedUser } = useAuthentication();
	const { notifications } = useSockets();
	const { toast } = useToast();
	const myUsername = authenticatedUser?.user.username!;

	useEffect(() => {
		notifications?.on("achievement_awarded", (args: AchievementsUpdateType) => {
			if (myUsername !== args.username) return;

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
	}, [notifications, myUsername, toast]);
};

export default useAchievementNotification;
