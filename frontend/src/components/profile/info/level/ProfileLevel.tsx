import { Badge } from "@/components/ui/badge";
import ProfileExperience from "./ProfileExperience";

export interface ProfileLevelProps {
	username: string;
	nickname: string;
	level: number;
	experience: number;
}

const ProfileLevel = ({ username, nickname, level, experience }: ProfileLevelProps) => {
	return (
		<div className="w-full flex flex-col items-center justify-center space-y-2 p-1">
			<Badge variant="outline">Level {level}</Badge>
			<ProfileExperience
				username={username}
				nickname={nickname}
				level={level}
				experience={experience}
			/>
		</div>
	);
};

export default ProfileLevel;
