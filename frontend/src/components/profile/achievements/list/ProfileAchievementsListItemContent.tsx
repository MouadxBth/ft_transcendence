import { AchievementType } from "@/lib/types/achievement/achievement";
import { Award } from "lucide-react";

const ProfileAchievementsListItemContent = ({ name, brief }: AchievementType) => {
	return (
		<div className=" bg-black h-20 w-full flex items-center justify-evenly max-sm:flex-col max-sm:items-center max-sm:space-y-2">
			<div className="flex space-x-2">
				<Award className="h-6 w-6" />
				<span className="text-md">{name}</span>
			</div>
			<p className="text-xs">{brief}</p>
		</div>
	);
};

export default ProfileAchievementsListItemContent;
