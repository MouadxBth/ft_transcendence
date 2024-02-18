"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";

export interface ProfileUnblockProps {
	username: string;
	className?: string;
}

const ProfileUnblock = ({ username, className }: ProfileUnblockProps) => {
	const { notifications } = useSockets();

	const unblock = () => {
		notifications?.emit("unblock_user", username);
	};

	return (
		<Button
			onClick={() => unblock()}
			className={className}
			variant="outline"
		>
			Unblock
		</Button>
	);
};

export default ProfileUnblock;
