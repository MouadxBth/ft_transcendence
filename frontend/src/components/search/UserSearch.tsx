"use client";

import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import UserSearchContent from "./UserSearchContent";
import { useSearch } from "@/hooks/search/useSearch";

const UserSearch = () => {
	const { open, setOpen, query, setQuery } = useSearch();
	const contentRef = useRef<HTMLDivElement>(null);

	return (
		<HoverCard open={query !== "" && open}>
			<HoverCardTrigger asChild>
				<Input
					className=" w-1/3 mr-4"
					type="text"
					placeholder="Search for someone..."
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setOpen(true)}
					onBlur={(event) => {
						const isInsideSpecificDiv =
							contentRef.current && contentRef.current.contains(event.relatedTarget);
						if (!isInsideSpecificDiv) setOpen(false);
					}}
				/>
			</HoverCardTrigger>
			<HoverCardContent
				className="p-0"
				ref={contentRef}
			>
				<UserSearchContent query={query} />
			</HoverCardContent>
		</HoverCard>
	);
};

export default UserSearch;
