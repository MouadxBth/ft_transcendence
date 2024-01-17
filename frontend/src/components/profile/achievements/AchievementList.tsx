import AchievementListItem from "./AchievementListItem";
import { AchievementType } from "@/lib/types/achievement";

export interface AchievementListProps {
	data: AchievementType[] | undefined;
}

const AchievementList = ({ data }: AchievementListProps) => {
	return (
		<div className="p-4 h-32 text-center">
			{!data || !data.length
				? "You still haven't achieved anything yet!"
				: data.map(({ name, brief, description, unlockedAt }) => (
						<AchievementListItem
							key={name}
							name={name}
							brief={brief}
							description={description}
							unlockedAt={unlockedAt}
						/>
				  ))}
		</div>
	);
};

export default AchievementList;
