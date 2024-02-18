"use client";

import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";
import ChannelsContextProvider from "@/providers/ChannelsContextProvider";
import ConversationsContextProvider from "@/providers/ConversationsContextProvider";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex w-full">
			<ConversationsContextProvider>
				<ChannelsContextProvider>
					<ChatSidebar />
					{children}
				</ChannelsContextProvider>
			</ConversationsContextProvider>
		</div>
	);
};

export default ChatLayout;
