"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export interface ChannelTabSearchProps {
	setQuery: Dispatch<SetStateAction<string>>;
}

const ChannelTabSearch = ({ setQuery }: ChannelTabSearchProps) => {
	return (
		<Input
			type="text"
			placeholder="Search for a Channel"
			onChange={(e) => {
				setQuery(e.target.value);
			}}
		/>
	);
};

export default ChannelTabSearch;
