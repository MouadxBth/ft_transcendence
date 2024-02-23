"use client";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";

export interface ProfileExperienceProps {
	username: string;
	nickname: string;
	level: number;
	experience: number;
	requiredExperience: number;
}

const ProfileExperience = ({
	username,
	nickname,
	level,
	experience,
	requiredExperience,
}: ProfileExperienceProps) => {
	const { authenticatedUser } = useAuthentication();
	const currentMessage =
		authenticatedUser?.user.username === username ? "You still need" : `${nickname} still needs`;

	const calculate = () => {
		const value =
			requiredExperience > 0 ? (experience / (experience + requiredExperience)) * 100 : 0;
		return value;
	};

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Progress
					value={calculate()}
					className="w-1/2"
				/>
			</HoverCardTrigger>
			<HoverCardContent className="rounded-2xl text-sm">{`${currentMessage} ${requiredExperience} experience points to become level ${level + 1}!`}</HoverCardContent>
		</HoverCard>
	);
};

export default ProfileExperience;
