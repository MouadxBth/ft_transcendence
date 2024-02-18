import useBlockStatus from "@/hooks/user/block/useBlockStatus";
import ProfileBlock from "./ProfileBlock";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useBlockUpdate from "@/hooks/user/block/useBlockUpdate";
import { BlockStatusType } from "@/lib/types/block/block-status";
import { useState, useEffect } from "react";
import ProfileBlockedBy from "./ProfileBlockedBy";
import ProfileBlocking from "./ProfileBlocking";
import { Button } from "@/components/ui/button";
import ProfileUnblock from "./ProfileUnblock";

export interface ProfileBlockButtonProps {
	target: string;
	className?: string;
}

const ProfileBlockButton = ({ target, className }: ProfileBlockButtonProps) => {
	const { data, isLoading } = useBlockStatus(target);
	const [loading, setLoading] = useState(true);
	const [status, setStatus] = useState<BlockStatusType | undefined>(undefined);
	const { authenticatedUser } = useAuthentication();
	const { blocking, blockedBy, targetNickname, targetId, senderId } = status || {};
	const condition =
		authenticatedUser?.user.username === targetId || authenticatedUser?.user.username === senderId;

	useBlockUpdate(target, setStatus);

	useEffect(() => {
		if (isLoading) return;

		if (data) setStatus(data);
		setLoading(false);
	}, [isLoading, data]);

	if (loading) {
		return (
			<Button
				disabled
				className={className}
				variant="outline"
			>
				Loading...
			</Button>
		);
	}

	if (condition) {
		if (blocking)
			return (
				<ProfileUnblock
					username={target}
					className={className}
				/>
			);

		if (blockedBy)
			return (
				<Button
					disabled
					className={className}
					variant="outline"
				>
					You are blocked
				</Button>
			);
	}

	return (
		<ProfileBlock
			target={target}
			className={className}
		/>
	);
};

export default ProfileBlockButton;
