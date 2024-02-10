"use clinet";

import React from "react";
import ChannelSettings from "./ChannelSettings";

export interface ChannelHeader {
	name: string;
}

const ChannelHeader = ({ name }: ChannelHeader) => {
	return (
		<div className="flex items-center justify-between py-2 px-6 border">
			<div>{name}</div>
			<ChannelSettings name={name} />
		</div>
	);
};

export default ChannelHeader;
