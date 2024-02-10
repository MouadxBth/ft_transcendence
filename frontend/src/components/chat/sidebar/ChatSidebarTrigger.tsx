import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface ChatSidebarTriggerProps {
	value: string;
	className?: string;
	children?: React.ReactNode;
}

const ChatSidebarTrigger = ({ value, className, children }: ChatSidebarTriggerProps) => {
	return (
		<TabsTrigger
			value={value}
			className={cn("basis-1/2", className)}
		>
			{children}
		</TabsTrigger>
	);
};

export default ChatSidebarTrigger;
