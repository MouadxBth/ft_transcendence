import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import ProfileAchievementsListItemContent from "./ProfileAchievementsListItemContent";
import { Separator } from "@/components/ui/separator";
import { formattedDate } from "@/lib/utils";
import { AchievementType } from "@/lib/types/achievement/achievement";

const ProfileAchievementsListItem = ({ name, brief, description, unlockedAt }: AchievementType) => {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<ProfileAchievementsListItemContent
					name={name}
					description={description}
					brief={brief}
					unlockedAt={unlockedAt}
				/>
				<Separator className="my-1" />
			</HoverCardTrigger>
			<HoverCardContent className="flex flex-col space-y-2">
				<p className="text-xs flex flex-col">
					<span>Unlocked on:</span>
					<span>{formattedDate(unlockedAt)}</span>
				</p>
				<div>{description}</div>
			</HoverCardContent>
		</HoverCard>
	);
};

export default ProfileAchievementsListItem;
