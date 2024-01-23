"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import useRequiredExperience from "@/hooks/user/useRequiredExperience";
import { useState, useEffect } from "react";

export interface ProfileExperienceProps {
	username: string;
	nickname: string;
	level: number;
	experience: number;
}

const ProfileExperience = ({ username, nickname, level, experience }: ProfileExperienceProps) => {
	const { authenticatedUser } = useAuthentication();
	const { data, isLoading } = useRequiredExperience(username);
	const [xp, setXp] = useState(0);
	const currentMessage =
		authenticatedUser?.user.username === username ? "You still need" : `${nickname} still needs`;

	useEffect(() => {
		if (isLoading || !data) return;

		setXp(data > 0 ? (experience / data) * 100 : 0);
	}, [isLoading, data, experience]);

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Progress
					value={xp}
					className="w-1/2"
				/>
			</HoverCardTrigger>
			<HoverCardContent className="rounded-2xl text-sm">{`${currentMessage} ${data!} experience points to become level ${level + 1}!`}</HoverCardContent>
		</HoverCard>
	);
};

export default ProfileExperience;
