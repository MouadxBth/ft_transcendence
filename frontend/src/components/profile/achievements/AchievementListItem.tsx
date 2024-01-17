import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AchievementType } from "@/lib/types/achievement";
import AchievementListItemContent from "./AchievementListItemContent";
import { Separator } from "@/components/ui/separator";

const AchievementListItem = ({ name, brief, description, unlockedAt }: AchievementType) => {
	return (
		<HoverCard>
			<HoverCardTrigger>
				<AchievementListItemContent
					name={name}
					description={description}
					brief={brief}
					unlockedAt={unlockedAt}
				/>
				<Separator className="my-3" />
			</HoverCardTrigger>
			<HoverCardContent>{description}</HoverCardContent>
		</HoverCard>
	);
};

export default AchievementListItem;
