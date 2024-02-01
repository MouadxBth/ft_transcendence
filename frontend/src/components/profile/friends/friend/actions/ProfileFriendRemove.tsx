"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import { cn } from "@/lib/utils";
import { UserMinus } from "lucide-react";

export interface ProfileFriendRemoveProps {
	className?: string;
	username: string;
}

const ProfileFriendRemove = ({ className, username }: ProfileFriendRemoveProps) => {
	const { notifications } = useSockets();

	return (
		<Button
			className={cn(" rounded-full flex space-x-2 items-center", className)}
			variant="outline"
			onClick={() => {
				notifications?.emit("unfriend_request", username);
			}}
		>
			<UserMinus />
			<div>Friend</div>
		</Button>
	);
};

export default ProfileFriendRemove;
