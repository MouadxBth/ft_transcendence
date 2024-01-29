import ProfileTitle, { ProfileTitleProps } from "./title/ProfileTitle";
import ProfileAvatar, { ProfileAvatarProps } from "./avatar/ProfileAvatar";

export interface ProfileInfoProps extends ProfileAvatarProps, ProfileTitleProps {
	username: string;
}

const ProfileInfo = ({ avatar, nickname, firstName, lastName, username }: ProfileInfoProps) => {
	return (
		<div className="flex justify-center items-center  w-full">
			<div className="flex items-center bg-black/75 rounded-2xl p-2">
				<ProfileAvatar
					username={username}
					avatar={avatar}
					nickname={nickname!}
				/>

				<ProfileTitle
					nickname={nickname!}
					firstName={firstName}
					lastName={lastName}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
