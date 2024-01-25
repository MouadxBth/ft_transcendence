import { Textarea } from "@/components/ui/textarea"
import { SocketsContext } from "@/contexts/SocketsContext";
import { useContext } from "react";

export const ConversationInput = () => {

	const { conversations } = useContext(SocketsContext)

	function handleSubmit(value: string) {
		console.log("on handle submit");
		conversations?.emit("send_message", {content: "hey dude", target: "deno"})
		//directMessage.mutate({content: value, target: params.id})
	}

	return (
		<Textarea
		callback={handleSubmit}
		className="max-h-80 resize-none"
		placeholder="Type a message..."
	/>
	)
}