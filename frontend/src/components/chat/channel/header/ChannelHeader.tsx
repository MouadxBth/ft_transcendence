"use client";

import React from "react";
import ChannelSettings from "./settings/ChannelSettings";

export interface ChannelHeader {
	name: string;
}

const ChannelHeader = ({ name }: ChannelHeader) => {
	return (
		<div className="flex items-center justify-between py-2 px-6 border">
			<div className="w-1/6  break-all whitespace-pre-wrap">{name}</div>
			<ChannelSettings
				name={name}
				className=" space-x-1"
			/>
		</div>
	);
};

export default ChannelHeader;
