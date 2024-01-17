import { AchievementType } from "@/lib/types/achievement";
import { dateFormat } from "@/lib/utils";
import { Award } from "lucide-react";

const AchievementListItemContent = ({ name, brief, unlockedAt }: AchievementType) => {
	return (
		<div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:space-y-2">
			<div className="flex space-x-2">
				<Award className="h-6 w-auto" />
				<span className="text-md">{name}</span>
			</div>
			<p className="text-sm">{brief}</p>
			<div className="text-xs flex flex-col">
				<p>Unlocked on:</p>
				<p>{dateFormat.format(unlockedAt)}</p>
			</div>
		</div>
	);
};

export default AchievementListItemContent;
