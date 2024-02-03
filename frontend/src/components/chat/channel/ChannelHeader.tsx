import React from "react";
import ChannelHeaderMenu from "./ChannelHeaderMenu";


export interface ChannelHeader {
	name: string;
}


const ChannelHeader = ({ name }: ChannelHeader) => {
	
	console.log("channel status: ", status, name);

	return (
		<>
		<div className="flex w-full flex-row justify-center p-2">
			<div className="flex flex-row justify-center w-full">
				<div className="flex flex-col justify-center">
					{name}
				</div>
			</div>
			<ChannelHeaderMenu name={name}/>
		</div>
		</>
	)
};

export default ChannelHeader;
