import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { cn } from "@/lib/utils";
import ChannelMemberRank from "./ChannelMemberRank";
import ChannelMemberMuted from "./ChannelMemberMuted";

export interface ChannelMemberStatusProps {
	member: ChannelMemberType;
	owner: boolean;
	className?: string;
}

const ChannelMemberStatus = ({ member, owner, className }: ChannelMemberStatusProps) => {
	return (
		<div className={cn("flex flex-col space-y-0.5", className)}>
			<ChannelMemberRank
				member={member}
				owner={owner}
			/>
			<ChannelMemberMuted muted={member.muted} />
		</div>
	);
};

export default ChannelMemberStatus;
