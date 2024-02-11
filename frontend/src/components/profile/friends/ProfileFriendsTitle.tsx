import { CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProfileFriendsTitleProps {
	className?: string;
}

const ProfileFriendsTitle = ({ className }: ProfileFriendsTitleProps) => {
	return (
		<CardHeader className={cn("p-0 pt-6 px-6", className)}>
			<CardTitle className="flex justify-between items-center relative">
				<div>Friends</div>
			</CardTitle>
		</CardHeader>
	);
};

export default ProfileFriendsTitle;
