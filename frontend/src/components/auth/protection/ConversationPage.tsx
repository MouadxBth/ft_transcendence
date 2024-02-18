"use client";

import Loading from "@/components/ui/loading";
import { useConversations } from "@/hooks/chat/conversation/useConversations";
import ConversationForbidden from "@/components/chat/conversation/forbidden/ConversationForbidden";

interface ConversationPageProps {
	children: React.ReactNode;
	params: { id: string };
}

export default function conversationPage(Component: any) {
	return function ConversationPage(props: ConversationPageProps) {
		const { conversations, isLoading } = useConversations();

		const conversation = conversations.find(
			(element) => element.target.username.toLowerCase() === props.params.id.toLowerCase()
		);

		if (isLoading) {
			return (
				<div className="w-3/4 h-full flex items-center justify-center">
					<Loading />
				</div>
			);
		}

		if (!conversation) {
			return <ConversationForbidden />;
		}

		return <Component {...props} />;
	};
}
