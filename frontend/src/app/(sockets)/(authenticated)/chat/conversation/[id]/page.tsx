"use client";

import ConversationHeader from "@/components/chat/conversation/ConversationHeader";
import { ConversationInput } from "@/components/chat/conversation/ConversationInput";
import { ConversationMessageArea } from "@/components/chat/conversation/ConversationMessageArea";

export interface ConversationMessageProps {
	id: number;
	sender: string;
	avatar: string;
	message: string;
	date: Date;
}

const ChatPage = ({ params }: { params: { id: string } }) => {
	
	console.log("rendered Channel Page...");

	return (
		<article className="w-3/4 flex flex-col h-full">
			<ConversationHeader username={params.id} />
			<ConversationMessageArea username={params.id} />
			<ConversationInput username={params.id} />
		</article>
	);
};

export default ChatPage;
