"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";

export interface ProfileFriendRequestCancelProps {
	className?: string;
	username: string;
}

const ProfileFriendRequestCancel = ({ className, username }: ProfileFriendRequestCancelProps) => {
	const { notifications } = useSockets();
	return (
		<Button
			className={cn("rounded-full flex space-x-2 items-center hover:bg-red-500", className)}
			variant="outline"
			onClick={() => {
				notifications?.emit("cancel_friend_request", username);
			}}
		>
			<Ban />
			<div>Request</div>
		</Button>
	);
};

export default ProfileFriendRequestCancel;
