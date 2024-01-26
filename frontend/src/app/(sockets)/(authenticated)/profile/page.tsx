import ProfileFriendsCard from "@/components/profile/friends/ProfileFriendsCard";
import ProfileInfoCard from "@/components/profile/info/ProfileInfoCard";

const ProfilePage = () => {
	return (
		<article className="h-full flex flex-col">
			<ProfileInfoCard />
			<ProfileFriendsCard />
		</article>
	);
};

export default ProfilePage;
