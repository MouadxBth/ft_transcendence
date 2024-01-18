import Image from "next/image";
import React from "react";

export type TeamSocialInfo = {
	src: string;
	alt: string;
	link: string;
};

export type TeamSocialsProps = {
	width: number;
	height: number;
	socials: TeamSocialInfo[];
};

const TeamSocials = ({ width, height, socials }: TeamSocialsProps) => {
	return (
		<ul className="flex items-center justify-center space-x-2 w-full">
			{socials.map(({ src, link, alt }, index) => (
				<li key={index}>
					<a href={link}>
						<Image
							src={src}
							alt={alt}
							width={width}
							height={height}
							className="bg-white rounded-full"
						/>
					</a>
				</li>
			))}
		</ul>
	);
};

export default TeamSocials;
