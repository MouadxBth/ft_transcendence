"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { UserRoundCheck } from "lucide-react";

export interface ProfileFriendRequestAcceptProps {
	className?: string;
	username: string;
}

const ProfileFriendRequestAccept = ({ className, username }: ProfileFriendRequestAcceptProps) => {
	const { notifications } = useSockets();
	return (
		<Button
			variant="outline"
			className={cn("rounded-full hover:bg-green-500 flex space-x-2 items-center", className)}
			onClick={() => {
				notifications?.emit("accept_friend_request", username);
			}}
		>
			<UserRoundCheck />
			<div>Request</div>
		</Button>
	);
};

export default ProfileFriendRequestAccept;
