import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ChannelMemberMutedProps {
	muted: boolean;
	className?: string;
}

const ChannelMemberMuted = ({ muted, className }: ChannelMemberMutedProps) => {
	if (muted)
		return (
			<Badge
				variant="outline"
				className={cn("text-red-500", className)}
			>
				Muted
			</Badge>
		);

	return <></>;
};

export default ChannelMemberMuted;
