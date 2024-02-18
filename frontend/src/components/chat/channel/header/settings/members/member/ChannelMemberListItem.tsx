import { Separator } from "@/components/ui/separator";
import ChannelMemberListItemBase from "../ChannelMemberListItemBase";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";

export interface ChannelMemberListItemProps {
	member: ChannelMemberType;
	owner: boolean;
}

const ChannelMemberListItem = ({ member, owner }: ChannelMemberListItemProps) => {
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

export default ChannelMemberListItem;
