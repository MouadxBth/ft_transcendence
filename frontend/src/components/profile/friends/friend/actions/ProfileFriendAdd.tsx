"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { UserPlus } from "lucide-react";

export interface ProfileFriendAddProps {
	className?: string;
	username: string;
}

const ProfileFriendAdd = ({ className, username }: ProfileFriendAddProps) => {
	const { notifications } = useSockets();

	return (
		<Button
			className={cn("rounded-full flex space-x-2 items-center", className)}
			variant="outline"
			onClick={() => {
				notifications?.emit("send_friend_request", username);
			}}
		>
			<UserPlus />
			<div>Friend</div>
		</Button>
	);
};

export default ProfileFriendAdd;
