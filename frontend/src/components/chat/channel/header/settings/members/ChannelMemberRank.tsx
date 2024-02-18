import { Badge } from "@/components/ui/badge";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { cn } from "@/lib/utils";

export interface ChannelMemberRankProps {
	member: ChannelMemberType;
	owner: boolean;
	className?: string;
}

const ChannelMemberRank = ({ member, owner, className }: ChannelMemberRankProps) => {
	if (owner)
		return (
			<Badge
				variant="outline"
				className={cn("text-amber-500", className)}
			>
				Owner
			</Badge>
		);
	if (member.admin)
		return (
			<Badge
				variant="outline"
				className={cn("text-red-500", className)}
			>
				Admin
			</Badge>
		);

	return (
		<Badge
			variant="outline"
			className={cn("text-blue-500", className)}
		>
			Member
		</Badge>
	);
};

export default ChannelMemberRank;
