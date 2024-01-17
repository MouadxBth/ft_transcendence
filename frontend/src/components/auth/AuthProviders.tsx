"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type IconType = {
	src: string;
	alt: string;
	href: string;
};

const icons: IconType[] = [
	{
		src: "/icons/42.svg",
		alt: "42 logo",
		href: "42",
	},
	{
		src: "/icons/google.svg",
		alt: "Google logo",
		href: "google",
	},
	{
		src: "/icons/github.svg",
		alt: "GitHub logo",
		href: "github",
	},
];

export type AuthProvidersProps = {
	width: number;
	height: number;
};

const AuthProviders = ({ width, height }: AuthProvidersProps) => {
	const { push } = useRouter();
	return (
		<ul className="flex items-center justify-center space-x-2 h-10">
			{icons.map(({ src, alt, href }, index) => (
				<li key={index}>
					<Button
						className="h-full rounded-full"
						onClick={() => push(`http://localhost:3000/api/v1/auth/${href}/login`)}
					>
						<Image
							src={src}
							alt={alt}
							width={width}
							height={height}
						/>
					</Button>
				</li>
			))}
		</ul>
	);
};

export default AuthProviders;
