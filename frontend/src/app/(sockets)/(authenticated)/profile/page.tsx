import ProfileAchievementsCard from "@/components/profile/achievements/ProfileAchievementsCard";
import ProfileFriendsCard from "@/components/profile/friends/ProfileFriendsCard";
import ProfileHistoryCard from "@/components/profile/history/ProfileHistoryCard";
import ProfileInfoCard from "@/components/profile/info/ProfileInfoCard";

const ProfilePage = () => {
	return (
		<article className="h-full flex flex-col space-y-2">
			<ProfileInfoCard />
			<div className="grid grid-cols-2 gap-2">
				<ProfileAchievementsCard />
				<ProfileFriendsCard />
				<ProfileHistoryCard className="col-span-2" />
			</div>
		</article>
	);
};

export default ProfilePage;
