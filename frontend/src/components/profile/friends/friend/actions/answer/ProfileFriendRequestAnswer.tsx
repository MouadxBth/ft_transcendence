import { cn } from "@/lib/utils";
import ProfileFriendRequestAccept from "./ProfileFriendRequestAccept";
import ProfileFriendRequestDeny from "./ProfileFriendRequestDeny";

export interface ProfileFriendRequestAnswerProps {
	username: string;
	className?: string;
}

const ProfileFriendRequestAnswer = ({ className, username }: ProfileFriendRequestAnswerProps) => {
	return (
		<div className={cn("flex space-x-1 items-center", className)}>
			<ProfileFriendRequestAccept username={username} />
			<ProfileFriendRequestDeny username={username} />
		</div>
	);
};

export default ProfileFriendRequestAnswer;
