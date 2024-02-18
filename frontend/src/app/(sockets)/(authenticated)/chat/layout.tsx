"use client";

import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";
import ConversationsContextProvider from "@/providers/ConversationsContextProvider";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex w-full">
			<ConversationsContextProvider>
				<ChatSidebar />
				{children}
			</ConversationsContextProvider>
		</div>
	);
};

export default ChatLayout;
