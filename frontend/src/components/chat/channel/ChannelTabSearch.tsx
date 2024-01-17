"use client";

import { useRef } from "react";
import { Input } from "../../ui/input";
import { ChannelTabListItemProps } from "./list/ChannelTabListItem";

export interface ChannelTabSearchProps {
	all: ChannelTabListItemProps[];
	setAll: React.Dispatch<React.SetStateAction<ChannelTabListItemProps[]>>;
}

const ChannelTabSearch = ({ all, setAll }: ChannelTabSearchProps) => {
	const ref = useRef<ChannelTabListItemProps[]>(all);
	return (
		<Input
			type="text"
			placeholder="Search for a Channel"
			onChange={(e) =>
				setAll(ref.current.filter((value) => value.nickname.startsWith(e.target.value)))
			}
		/>
	);
};

export default ChannelTabSearch;
