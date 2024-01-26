import { User } from "@/lib/types/user";
import ProfileFriendsTitle from "./ProfileFriendsTitle";
import ProfileFriendsContent from "./ProfileFriendsContent";
import { Card } from "@/components/ui/card";

export interface ProfileFriendsCardProps {
	user?: User;
}

const ProfileFriendsCard = ({ user }: ProfileFriendsCardProps) => {
	return (
		<Card>
			<ProfileFriendsTitle user={user} />
			<ProfileFriendsContent user={user} />
		</Card>
	);
};

export default ProfileFriendsCard;
