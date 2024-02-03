import React from "react";
import ChannelHeaderMenu from "./ChannelHeaderMenu";


export interface ChannelHeader {
	name: string;
}


const ChannelHeader = ({ name }: ChannelHeader) => {
	
	console.log("channel status: ", status, name);

	return (
		<div className="w-full p-4">
		<div className="flex w-full flex-row justify-center rounded-xl bg-muted">
			<div className="flex flex-row justify-center w-full">
				<div className="flex flex-col justify-center">
					{name}
				</div>
			</div>
			<ChannelHeaderMenu name={name}/>
		</div>
		</div>
	)
};

export default ChannelHeader;
