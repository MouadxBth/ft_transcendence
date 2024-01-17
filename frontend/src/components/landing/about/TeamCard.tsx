import React from "react";

import Image from "next/image";
import TeamSocials, { TeamSocialInfo } from "./TeamSocials";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

export type TeamCardProps = {
	avatar: string;
	username: string;
	firstName: string;
	lastName: string;
	title: string;
	description: string;
	socials: TeamSocialInfo[];
};

const TeamCard = ({
	avatar,
	username,
	firstName,
	lastName,
	title,
	description,
	socials,
}: TeamCardProps) => {
	return (
		<Card className="shadow-md shadow-blue-500/50 rounded">
			<CardHeader>
				<div className="flex justify-center">
					<Image
						src={avatar}
						alt="avatar"
						width={100}
						height={100}
						className="w-[100] h-[100] rounded-full shadow-md shadow-blue-500/50"
					/>
				</div>

				<CardTitle className="text-center">{username}</CardTitle>

				<span className="text-center">{title}</span>

				<CardDescription className="text-center">{`${firstName} ${lastName}`}</CardDescription>
			</CardHeader>

			<CardContent className="text-center text-sm pb-2">{description}</CardContent>

			<CardFooter>
				<TeamSocials
					width={30}
					height={30}
					socials={socials}
				/>
			</CardFooter>
		</Card>
	);
};

export default TeamCard;
