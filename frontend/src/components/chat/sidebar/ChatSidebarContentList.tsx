import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface ChatSidebarContentListProps {
	className?: string;
	children?: React.ReactNode;
}

const ChatSidebarContentList = ({ children, className }: ChatSidebarContentListProps) => {
	return <ScrollArea className={cn("h-full ", className)}>{children}</ScrollArea>;
};

export default ChatSidebarContentList;
