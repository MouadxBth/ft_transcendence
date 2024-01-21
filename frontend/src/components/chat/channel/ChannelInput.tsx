import { Textarea } from "@/components/ui/textarea";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import { useChannelContext } from "@/hooks/useChannelContext";
import React from "react";

const ChannelInput = ({ name } : {name: string}) => {
	
	const {channelData, setChannelData} = useChannelContext();
	const { authenticatedUser } = useAuthentication();

	console.log(authenticatedUser);
	function handleSubmit(value: string) {
		console.log("msg", value);
		const channelMessages = channelData.find((ele) => ele.name === name)?.messages
		channelMessages!.push({
			id: 90,
			senderId: authenticatedUser?.user.nickname!,
			content: value,
			createdAt: Date(),
			updatedAt: Date(),
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
