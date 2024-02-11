export interface ProfileBlockedByProps {
	nickname: string;
}

const ProfileBlockedBy = ({ nickname }: ProfileBlockedByProps) => {
	return (
		<article className="h-full flex items-center justify-center">
			You are blocked By {nickname}
		</article>
	);
};

export default ProfileBlockedBy;
