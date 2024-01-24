import ProfileUnblock from "./ProfileUnblock";

export interface ProfileBlockingProps {
	username: string;
	target: string;
}

const ProfileBlocking = ({ username, target }: ProfileBlockingProps) => {
	return (
		<article className="h-full flex items-center justify-center ">
			<div className="flex flex-col space-y-2">
				<div>You have blocked {target}</div>
				<ProfileUnblock username={username} />
			</div>
		</article>
	);
};

export default ProfileBlocking;
