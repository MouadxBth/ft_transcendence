import { TabsList } from "@/components/ui/tabs";

export interface ChatSidebarTriggerListProps {
	children?: React.ReactNode;
}

const ChatSidebarTriggerList = ({ children }: ChatSidebarTriggerListProps) => {
	return <TabsList className="w-full">{children}</TabsList>;
};

export default ChatSidebarTriggerList;
