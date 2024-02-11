import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import ProfileOnlineStatus from "./ProfileOnlineStatus";

export interface ProfileAvatarProps {
	username: string;
	nickname: string;
	avatar: string;
}

const ProfileAvatar = ({ username, avatar, nickname }: ProfileAvatarProps) => {
	const avatarSource = avatar.startsWith("http")
		? avatar
		: `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/avatar/${avatar}`;

	return (
		<CardContent>
			<div className="relative">
				<Avatar className=" h-24 w-24 ">
					<AvatarImage
						className="object-cover"
						src={avatarSource}
					/>
					<AvatarFallback>{nickname?.slice(0, 2)}</AvatarFallback>
				</Avatar>
				<ProfileOnlineStatus
					username={username}
					className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
				/>
			</div>
		</CardContent>
	);
};

export default ProfileAvatar;
