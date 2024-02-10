import ChatSidebar from "@/components/chat/sidebar/ChatSidebar";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex w-full">
			<ChatSidebar />
			{children}
		</div>
	);
};

export default ChatLayout;
