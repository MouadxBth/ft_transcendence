import { useEffect, useState } from "react";
import useFriendsFetch from "@/hooks/user/friends/useFriendsFetch";
import { FormItem } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { FriendType } from "@/lib/types/friend/friend";
import { Matchmakingprops } from "./GameMatchmaking";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import SelectedFriend from "./SelectedFriend";
import FriendsList from "./FriendsList";

const InviteField = ({ form }: Matchmakingprops) => {
	const { authenticatedUser } = useAuthentication();
	const [value, setValue] = useState("");
	const username = authenticatedUser!.user.username;
	const { data, isLoading, isSuccess, isError, error } = useFriendsFetch(username);
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState<FriendType[]>([]);
	useEffect(() => {
		if (isLoading) {
			setLoading(true);
			return;
		}

		if (data) setFriends(data);
		setLoading(false);
	}, [data, isLoading, isError, isSuccess, error]);
	const userfriend = data?.find((friend) => friend.nickname === value);
	return (
		<>
			<FormItem className="space-y-3 flex flex-col justify-center items-center">
				<Popover>
					{value ? (
						<p className="text-xs text-muted-foreground">
							Invite <span className="underline-offset-1">{value}</span> to a match
						</p>
					) : (
						<p className="text-xs text-muted-foreground">Leave empty for auto matchmaking</p>
					)}
					<SelectedFriend
						value={value}
						friend={userfriend}
					/>
					<FriendsList
						form={form}
						value={value}
						data={friends}
						setValue={setValue}
					/>
				</Popover>
			</FormItem>
		</>
	);
};

export default InviteField;
