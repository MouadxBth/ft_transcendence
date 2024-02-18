import { Separator } from "@/components/ui/separator";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import ChannelMemberListItemBase from "../ChannelMemberListItemBase";

export interface ChannelMemberInviteListItemProps {
	member: ChannelMemberType;
	owner: boolean;
}

const ChannelMemberInviteListItem = ({ member, owner }: ChannelMemberInviteListItemProps) => {
	return (
		<>
			<ChannelMemberListItemBase
				member={member}
				owner={owner}
			/>
			<Separator className="my-1" />
		</>
	);
};

export default ChannelMemberInviteListItem;
