import { CardDescription, CardTitle } from "@/components/ui/card";

export interface ProfileTitleProps {
	nickname: string;
	firstName: string;
	lastName: string;
}

const ProfileTitle = ({ nickname, firstName, lastName }: ProfileTitleProps) => {
	return (
		<div className="flex flex-col ">
			<CardTitle className="rounded-full p-2 text-center">
				<span className="font-light">@</span>
				{nickname}
			</CardTitle>
			<CardDescription className="rounded-full p-1 px-2 text-center">{`${firstName} ${lastName}`}</CardDescription>
		</div>
	);
};

export default ProfileTitle;
