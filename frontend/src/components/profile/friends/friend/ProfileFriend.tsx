"use client";

import React, { useEffect, useState } from "react";
import ProfileFriendRemove from "./actions/ProfileFriendRemove";
import ProfileFriendAdd from "./actions/ProfileFriendAdd";
import ProfileFriendRequestCancel from "./actions/ProfileFriendRequestCancel";
import ProfileFriendRequestAnswer from "./actions/answer/ProfileFriendRequestAnswer";
import { User } from "@/lib/types/user";
import useFriendStatus from "@/hooks/user/useFriendStatus";
import { FriendStatusType } from "@/lib/types/friend-status";
import ProfileFriendLoading from "./ProfileFriendLoading";
import useFriendStatusUpdate from "@/hooks/user/useFriendStatusUpdate";

export interface ProfileFriendProps {
	user: User;
	className?: string;
}

const ProfileFriend = ({ className, user }: ProfileFriendProps) => {
	const { data, isLoading } = useFriendStatus(user.username);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<FriendStatusType | undefined>(undefined);

	useFriendStatusUpdate(user, setStatus);

	useEffect(() => {
		if (isLoading) return;

		setStatus(data!);
		setLoading(false);
	}, [isLoading, data]);

	if (loading) return <ProfileFriendLoading />;

	// if friend give button to unfriend
	if (status?.friends) {
		return (
			<ProfileFriendRemove
				username={user.username}
				className={className}
			/>
		);
	}

	// if friend request sent set button pending
	if (status?.sentRequest) {
		return (
			<ProfileFriendRequestCancel
				username={user.username}
				className={className}
			/>
		);
	}

	// if friend reqiest received set button accept or decline
	if (status?.receivedRequest) {
		return (
			<ProfileFriendRequestAnswer
				username={user.username}
				className={className}
			/>
		);
	}

	// if not friend give button to send friend request
	return (
		<ProfileFriendAdd
			username={user.username}
			className={className}
		/>
	);
};

export default ProfileFriend;
