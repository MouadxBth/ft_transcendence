"use client";

import { Card } from "@/components/ui/card";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { User } from "@/lib/types/user";
import { backgroundStyles, cn } from "@/lib/utils";
import ProfileInfoLevel from "./level/ProfileLevel";
import ProfileInfo from "./ProfileInfo";
import ProfileBlock from "./block/ProfileBlock";

export interface ProfileInfoCardProps {
	user?: User;
}

const ProfileInfoCard = ({ user }: ProfileInfoCardProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentUser = user ?? authenticatedUser?.user!;
	const { nickname, username, firstName, lastName, avatar, banner, level, experience } =
		currentUser;

	return (
		<Card
			className="flex flex-col justify-center items-center py-2 w-full border-x-0 relative"
			style={backgroundStyles(banner)}
		>
			<ProfileBlock
				target={currentUser.username}
				className={cn("absolute top-2 right-2 rounded-2xl", {
					hidden: currentUser.username === authenticatedUser?.user.username,
				})}
			/>
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
				level={level}
				experience={experience}
			/>
		</Card>
	);
};

export default ProfileInfoCard;
