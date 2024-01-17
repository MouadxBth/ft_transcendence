import React from "react";

export interface ChannelHeader {
	name: string;
}

const ChannelHeader = ({ name }: ChannelHeader) => {
	return <div className="flex items-center justify-center p-2">{name}</div>;
};

export default ChannelHeader;
