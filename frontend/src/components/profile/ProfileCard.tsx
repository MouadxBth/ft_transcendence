"use client";

import { useAuthentication } from "@/contexts/AuthenticationContext";
import ProfileTitle from "./ProfileTitle";
import { User } from "@/lib/types/user";

const ProfileCard = ({ user }: { user: User | null }) => {
	if (!user) return null;

	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm flex justify-between p-5 max-sm:flex-col max-sm:items-center">
			<ProfileTitle user={user} />

			<div className="flex flex-col justify-center  max-sm:py-4">
				<div>Level: 15</div>
				<div>Online: true</div>
			</div>
		</div>
	);
};

export default ProfileCard;
