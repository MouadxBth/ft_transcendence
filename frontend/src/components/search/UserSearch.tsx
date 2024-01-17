"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import UserSearchContent from "./UserSearchContent";

const UserSearch = () => {
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);

	return (
		<HoverCard open={query !== "" && open}>
			<HoverCardTrigger asChild>
				<Input
					className=" w-1/3 mr-4"
					type="text"
					placeholder="Search for someone..."
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setOpen(true)}
					onBlur={() => setOpen(false)}
				/>
			</HoverCardTrigger>
			<HoverCardContent className="p-0">
				<UserSearchContent query={query} />
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserSearch;
