import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { ConversationMessage } from "./message/ConversationMessage";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";
import { useConversationContext } from "@/hooks/useConversationContext";
import useSockets from "@/hooks/socket/useSockets";
import fetchUser from "@/lib/chat/user-service-endpoints";

export const ConversationMessageArea = ({ username }: {username: string}) => {
	
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const {conversationData} = useConversationContext();

	function getUserConversation() {

		console.log("retrieving messages...", conversationData)

		const res =  conversationData.find((ele) => ele.username === username);
		
		if (!res) {
			throw Error("cannot find elemnt in conversation data: " + username)
		}
		return res;
	}

	const { messages, avatar } = getUserConversation()!;

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	
	useEffect(() => {
		scrollToBottom();
	});

	console.log("finished rendering conversation list...", messages);
	
	return (
		<ScrollArea className="h-full">
			{!messages || !messages.length ? (
				<div className="p-5 bg-black">You don&apos;t any conversations yet!</div>
			) : (
				messages.map((item) => (
					<ConversationMessage
						key={item.id}
						id={item.id}
						sender={item.senderId}
						avatar={avatar}
						message={item.content}
						date={new Date(item.updatedAt)}
					/>
				))
			)}
			<div ref={messagesEndRef} />
		</ScrollArea>
	)
}