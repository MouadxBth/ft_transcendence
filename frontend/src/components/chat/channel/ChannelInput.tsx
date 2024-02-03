import { Textarea } from "@/components/ui/textarea";
import { useAuthentication } from "@/contexts/AuthenticationContext";
import useSockets from "@/hooks/socket/useSockets";
import { useChannelContext } from "@/hooks/useChannelContext";
import React from "react";

const ChannelInput = ({ name } : {name: string}) => {
	
	const {channelData, setChannelData} = useChannelContext();
	const { authenticatedUser } = useAuthentication();
	const { channels } = useSockets();

	console.log(authenticatedUser);
	function handleSubmit(value: string) {
		console.log("msg", value);
		channels?.emit("send_message", {message: "hey", channelName: "random"});
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
		<div className="flex flex-col justify-center px-3 my-2">
			<Textarea
				callback={handleSubmit}
				className="border-0 bg-muted rounded-xl resize-none"
				placeholder="Type a message..."
			/>
		</div>
	);
};

export default ChannelInput;
