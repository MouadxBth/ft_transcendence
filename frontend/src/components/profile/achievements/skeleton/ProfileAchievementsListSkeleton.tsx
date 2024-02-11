import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileAchievementsListItemSkeleton from "./ProfileAchievementsListItemSkeleton";

const random = Array.from({ length: 10 }, (_, index) => index + 1);

const ProfileAchievementsListSkeleton = () => {
	return (
		<ScrollArea className="w-full">
			<div className="p-2 max-h-32 text-center">
				{random.map((element) => {
					return <ProfileAchievementsListItemSkeleton key={element} />;
				})}
			</div>
		</ScrollArea>
	);
};

export default ProfileAchievementsListSkeleton;
