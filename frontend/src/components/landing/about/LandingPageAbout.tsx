import React from "react";

import TeamMembers from "./team/TeamMembers";
import Title from "@/components/ui/title";

const LandingPageAbout = () => {
	return (
		<article className="flex flex-col justify-center">
			<Title className="text-center pb-10 text-5xl">About the team</Title>

			<p className="text-sm mb-10 px-4">
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
				took a galley of type and scrambled it to make a type specimen book. It has survived not
				only five centuries, but also the leap into electronic typesetting, remaining essentially
				unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
				Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
				PageMaker including versions of Lorem Ipsum.
			</p>

			<TeamMembers />
		</article>
	);
};

export default LandingPageAbout;
