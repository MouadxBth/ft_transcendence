"use client";

import ProfileBlockedBy from "@/components/profile/info/block/ProfileBlockedBy";
import ProfileBlocking from "@/components/profile/info/block/ProfileBlocking";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useBlockStatus from "@/hooks/user/block/useBlockStatus";
import useBlockUpdate from "@/hooks/user/block/useBlockUpdate";
import { BlockStatusType } from "@/lib/types/block/block-status";

import React, { useEffect, useState } from "react";

interface ProfileLayoutProps {
	children: React.ReactNode;
	params: { id: string };
}

const ProfileLayout = ({ children, params }: ProfileLayoutProps) => {
	const { data, isLoading } = useBlockStatus(params.id);
	const [_, setLoading] = useState(true);
	const [status, setStatus] = useState<BlockStatusType | undefined>(undefined);
	const { authenticatedUser } = useAuthentication();
	const { blocking, blockedBy, targetNickname, targetId, senderId } = status || {};
	const condition =
		authenticatedUser?.user.username === targetId || authenticatedUser?.user.username === senderId;

	useBlockUpdate(params.id, setStatus);

	useEffect(() => {
		if (isLoading) return;

		if (data) setStatus(data);
		setLoading(false);
	}, [isLoading, data]);

	if (condition) {
		if (blocking)
			return (
				<ProfileBlocking
					username={params.id}
					target={targetNickname!}
				/>
			);

		if (blockedBy) return <ProfileBlockedBy nickname={targetNickname!} />;
	}

	return <>{children}</>;
};

export default ProfileLayout;
