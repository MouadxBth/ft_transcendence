import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface ChatSidebarContentProps {
	value: string;
	className?: string;
	children?: React.ReactNode;
}

const ChatSidebarContent = ({ value, className, children }: ChatSidebarContentProps) => {
	return (
		<TabsContent
			value={value}
			className={cn("m-0 h-[calc(100%-97px)]", className)}
		>
			{children}
		</TabsContent>
	);
};

export default ChatSidebarContent;
