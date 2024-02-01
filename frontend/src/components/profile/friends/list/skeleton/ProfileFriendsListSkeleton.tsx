import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileFriendsListItemSkeleton from "./ProfileFriendsListItemSkeleton";

const random = Array.from({ length: 10 }, (_, index) => index + 1);

const ProfileFriendsListSkeleton = () => {
	return (
		<ScrollArea className="w-full">
			<div className="p-2 max-h-32 text-center">
				{random.map((element) => {
					return <ProfileFriendsListItemSkeleton key={element} />;
				})}
			</div>
		</ScrollArea>
	);
};

export default ProfileFriendsListSkeleton;
