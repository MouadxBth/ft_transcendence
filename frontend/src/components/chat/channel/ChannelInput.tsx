import { Textarea } from "@/components/ui/textarea";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useChannelContext } from "@/hooks/useChannelData";
import React from "react";

const ChannelInput = ({ name } : {name: string}) => {
	
	const {channelData, setChannelData} = useChannelContext();
	const { authenticatedUser } = useAuthentication();

	function handleSubmit(value: string) {
		console.log("msg", value);
		const channelMessages = channelData.find((ele) => ele.name === name)?.messages
		channelMessages!.push({
			id: 90,
			sender: "troy",
			avatar: 'df',
			message: value,
			date: new Date()
 		})
		setChannelData(channelData.slice());
	}

	return (
		<div className="h-20">
			<Textarea
				callback={handleSubmit}
				className="max-h-80 resize-none"
				placeholder="Type a message..."
			/>
		</div>
	);
};

export default ChannelInput;
