import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CardTitle } from "../ui/card";
import { User } from "@/lib/types/user";

export interface ProfileTitleProps {
	user: User;
}

const ProfileTitle = ({ user }: ProfileTitleProps) => {
	const avatar = user.avatar;
	return (
		<CardTitle className="flex space-x-2 items-center">
			<Avatar className="h-20 w-20">
				<AvatarImage
					className="object-cover"
					src={
						avatar
							? avatar.startsWith("http")
								? avatar
								: `http://localhost:3000/api/v1/avatar/${avatar}`
							: ""
					}
				/>
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>

			<div>
				<div className="text-2xl leading-none tracking-tight">{user.nickname}</div>

				<p className="text-sm text-muted-foreground">{`${user.firstName || "Anonymous"} ${
					user.lastName || "Anonymous"
				}`}</p>
			</div>
		</CardTitle>
	);
};

export default ProfileTitle;
