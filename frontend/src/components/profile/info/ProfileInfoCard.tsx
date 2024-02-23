"use client";

import { Card } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { backgroundStyles } from "@/lib/utils";
import ProfileInfoLevel from "./level/ProfileLevel";
import ProfileInfo from "./ProfileInfo";
import ProfileBlock from "./block/ProfileBlock";
import { User } from "@/lib/types/user/user";

export interface ProfileInfoCardProps {
	user?: User;
}

const ProfileInfoCard = ({ user }: ProfileInfoCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser = user ?? authenticatedUser?.user!;
	const { nickname, username, firstName, lastName, avatar, banner, level, experience } =
		currentUser;

	const myProfile = username === authenticatedUser?.user.username;

	return (
		<Card
			className="flex flex-col justify-center items-center py-2 w-full border-x-0 relative"
			style={backgroundStyles(banner)}
		>
			{!myProfile && (
				<ProfileBlock
					target={currentUser.username}
					className="absolute top-2 right-2 rounded-2xl"
				/>
			)}

			<ProfileInfo
				username={username}
				nickname={nickname!}
				firstName={firstName}
				lastName={lastName}
				avatar={avatar}
			/>

			<ProfileInfoLevel
				username={username}
				nickname={nickname!}
			/>
		</Card>
	);
};

export default ProfileInfoCard;
