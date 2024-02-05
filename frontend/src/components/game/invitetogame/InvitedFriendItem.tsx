import { FormItem } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import SelectedFriend, { SelectedFriendProps } from "../components/GameMatchmaking/SelectedFriend";

const InvitedFriendItem = ({ value, friend }: SelectedFriendProps) => {
	return (
		<div>
			<FormItem className="space-y-3 flex flex-col justify-center items-center">
				<Popover>
					<SelectedFriend
						value={value}
						friend={friend}
					/>
				</Popover>
			</FormItem>
		</div>
	);
};

export default InvitedFriendItem;
