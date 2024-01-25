import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useEffect, useRef } from "react";
import { ConversationMessage } from "./message/ConversationMessage";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { useConversationContext } from "@/hooks/useConversationContext";

export const ConversationMessageArea = ({ username }: {username: string}) => {
	
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const {conversationData, setConversationData} = useConversationContext();

	function getUserMessages() {
		return conversationData.find((ele) => ele.username === username);
	}

	const { messages } = getUserMessages()!;
	
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	
	useEffect(() => {
		scrollToBottom();
	});
	
	return (
		<ScrollArea className="h-full scroll">
			{!messages || !messages.length ? (
				<div className="p-5 bg-black">You don&apos;t any conversations yet!</div>
			) : (
				messages.map((item) => (
					<ConversationMessage
						key={item.id}
						id={item.id}
						sender={item.senderId}
						avatar={"none"}
						message={item.content}
						date={new Date(item.updatedAt)}
					/>
				))
			)}
			<div ref={messagesEndRef} />
		</ScrollArea>
	)
}