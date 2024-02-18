import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import ChatSidebarTriggerList from "./ChatSidebarTriggerList";
import ChatSidebarTrigger from "./ChatSidebarTrigger";
import ConversationTab from "../conversation/ConversationTab";
import ChannelTab from "../channel/ChannelTab";

interface ChatSidebarProps {
	className?: string;
}

const ChatSidebar = ({ className }: ChatSidebarProps) => {
	return (
		<Tabs
			defaultValue="conversations"
			className={cn("w-1/4 flex flex-col border-r bg-black", className)}
		>
			<ChatSidebarTriggerList>
				<ChatSidebarTrigger value="conversations">Conversations</ChatSidebarTrigger>
				<ChatSidebarTrigger value="channels">Channels</ChatSidebarTrigger>
			</ChatSidebarTriggerList>

			<ConversationTab />
			<ChannelTab />
		</Tabs>
	);
};

export default ChatSidebar;
