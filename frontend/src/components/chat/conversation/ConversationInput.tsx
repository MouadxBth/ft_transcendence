import { Textarea } from "@/components/ui/textarea"
import { SocketsContext } from "@/contexts/SocketsContext";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { conversationContext, useConversationContext } from "@/hooks/useConversationContext";
import { useContext } from "react";

export const ConversationInput = ({username} : {username: string}) => {

	const { conversations } = useContext(SocketsContext)

	const {conversationData, setConversationData} = useConversationContext();

	const {data} = useAuthenticatedUser();

	function getUserMessages(username: string) {
		
		const res = conversationData.find((ele) => ele.username === username);

		console.log("retrieving messages...")

		if (!res)
			throw Error("find: not conversation found for user: " + username);

		return res;
	}
	
	const handleSubmit = (value: string) => {
		
		console.log("on handle submit:", value);

		conversations!.emit("send_message", {
			content: value,
			target: username,
		})
	
		const messages = getUserMessages(username);

		messages.messages.push({
			id: 2,
			createdAt: Date(),
			updatedAt: Date(),
			content: value,
			senderId: data?.user.username!,
			read: false,
		})

		setConversationData([...conversationData]);
	}

	return (
		<div className="flex flex-col justify-center px-3 my-2">

			<Textarea
				callback={handleSubmit}
				className="border-0 bg-muted rounded-xl resize-none"
				placeholder="Type a message..."
			/>
		</div>
	)
}