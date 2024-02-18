import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationMessageSkeleton from "./ConversationMessageSkeleton";

export interface ConversationMessageListSkeletonProps {
	className?: string;
}

const ConversationMessageListSkeleton = ({ className }: ConversationMessageListSkeletonProps) => {
	return (
		<ScrollArea className={className}>
			{Array.from({ length: 10 }).map((_, i) => (
				<ConversationMessageSkeleton key={i} />
			))}
		</ScrollArea>
	);
};

export default ConversationMessageListSkeleton;
