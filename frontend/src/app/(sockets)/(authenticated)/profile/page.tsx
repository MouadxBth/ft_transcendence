import ProfileAchievementsCard from "@/components/profile/achievements/ProfileAchievementsCard";
import ProfileFriendsCard from "@/components/profile/friends/ProfileFriendsCard";
import ProfileInfoCard from "@/components/profile/info/ProfileInfoCard";

const ProfilePage = () => {
	return (
		<article className="h-full flex flex-col space-y-2">
			<ProfileInfoCard />
			<div className="grid grid-cols-2 gap-2">
				<ProfileAchievementsCard />
				<ProfileFriendsCard />
			</div>
		</article>
	);
};

export default ProfilePage;
