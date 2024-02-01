"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { UserRoundX } from "lucide-react";

export interface ProfileFriendRequestDenyProps {
	className?: string;
	username: string;
}

const ProfileFriendRequestDeny = ({ className, username }: ProfileFriendRequestDenyProps) => {
	const { notifications } = useSockets();
	return (
		<Button
			variant="outline"
			className={cn("rounded-full hover:bg-red-500 flex space-x-2 items-center", className)}
			onClick={() => {
				notifications?.emit("deny_friend_request", username);
			}}
		>
			<UserRoundX />
			<div>Request</div>
		</Button>
	);
};

export default ProfileFriendRequestDeny;
