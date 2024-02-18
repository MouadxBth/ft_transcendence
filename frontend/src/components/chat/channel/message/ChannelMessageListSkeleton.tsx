import { ScrollArea } from "@/components/ui/scroll-area";
import ChannelMessageSkeleton from "./ChannelMessageSkeleton";

export interface ChannelMessageListSkeletonProps {
	className?: string;
}

const ChannelMessageListSkeleton = ({ className }: ChannelMessageListSkeletonProps) => {
	return (
		<ScrollArea className={className}>
			{Array.from({ length: 10 }).map((_, i) => (
				<ChannelMessageSkeleton key={i} />
			))}
		</ScrollArea>
	);
};

export default ChannelMessageListSkeleton;
