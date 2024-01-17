import { Trophy, Sparkles } from "lucide-react";

export interface AchievementStatsProps {
	unlocked: number;
}

const AchievementStats = ({ unlocked }: AchievementStatsProps) => {
	return (
		<div className="flex justify-between pt-2">
			<div className="flex space-x-1">
				<div>Unlocked: {unlocked}</div>
				<Trophy className="w-4 h-auto text-green-500" />
			</div>

			{/* <div className="flex space-x-1">
				<div>Experience: 0</div>
				<Sparkles className="w-4 h-auto text-amber-500" />
			</div> */}
		</div>
	);
};

export default AchievementStats;
