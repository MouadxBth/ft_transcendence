import React from "react";
import TeamCard from "./TeamCard";
import { AUTHORS } from "@/lib/authors";

const TeamMembers = () => {
	return (
		<div className="grid gap-2 grid-cols-1 lg:grid-cols-5 p-4">
			{AUTHORS.map(
				({ avatar, username, firstName, lastName, title, description, socials }, index) => (
					<TeamCard
						key={index}
						avatar={avatar}
						username={username}
						firstName={firstName}
						lastName={lastName}
						title={title}
						description={description}
						socials={socials}
					/>
				)
			)}
		</div>
	);
};

export default TeamMembers;
