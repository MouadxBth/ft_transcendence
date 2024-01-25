"use client";

import { Button } from "@/components/ui/button";
import useSockets from "@/hooks/socket/useSockets";
import React from "react";

export interface ProfileUnblockProps {
	username: string;
}

const ProfileUnblock = ({ username }: ProfileUnblockProps) => {
	const { notifications } = useSockets();

	const unblock = () => {
		notifications?.emit("unblock_user", username);
	};

	return (
		<Button
			onClick={() => unblock()}
			variant="outline"
		>
			Unblock
		</Button>
	);
};

export default ProfileUnblock;
