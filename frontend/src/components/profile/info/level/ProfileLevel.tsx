import { Badge } from "@/components/ui/badge";
import ProfileExperience from "./ProfileExperience";
import useLevel from "@/hooks/user/useLevel";
import { useEffect, useState } from "react";
import { LevelType } from "@/lib/types/user/level";

export interface ProfileLevelProps {
	username: string;
	nickname: string;
}

const ProfileLevel = ({ username, nickname }: ProfileLevelProps) => {
	const { data, isLoading } = useLevel(username);
	const [levelData, setLevelData] = useState<LevelType | undefined>(undefined);

	useEffect(() => {
		if (isLoading || !data) return;

		setLevelData(data);
	}, [isLoading, data]);

	if (isLoading || !levelData)
		return (
			<div className="w-full flex flex-col items-center justify-center space-y-2 p-1">
				<Badge variant="outline">Level (...)</Badge>
			</div>
		);

	return (
		<div className="w-full flex flex-col items-center justify-center space-y-2 p-1">
			<Badge variant="outline">Level {levelData.level}</Badge>
			<ProfileExperience
				username={username}
				nickname={nickname}
				level={levelData.level}
				experience={levelData.experience}
				requiredExperience={levelData.required}
			/>
		</div>
	);
};

export default ProfileLevel;
