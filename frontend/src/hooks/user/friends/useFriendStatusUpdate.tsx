import { useEffect } from "react";
import { useAuthentication } from "../../authentication/useAuthentication";
import useSockets from "../../socket/useSockets";
import { User } from "@/lib/types/user/user";
import { FriendRequestType } from "@/lib/types/friend/friend-request";
import { FriendStatusType } from "@/lib/types/friend/friend-status";

const useFriendStatusUpdate = (
	user: User,
	setStatus: React.Dispatch<React.SetStateAction<FriendStatusType | undefined>>
) => {
	const { notifications } = useSockets();
	const { authenticatedUser } = useAuthentication();

	const myUsername = authenticatedUser?.user.username!;
	const currentlyLookingAt = user.username;

	useEffect(() => {
		notifications?.on("sent_friend_request", (args: FriendRequestType) => {
			if (args.target.username !== currentlyLookingAt) return;

			setStatus({
				friends: false,
				sentRequest: true,
				receivedRequest: true,
			} as FriendStatusType);
		});

		notifications?.on("receive_friend_request", (args: FriendRequestType) => {
			if (args.sender.username !== currentlyLookingAt) return;

			setStatus({
				friends: false,
				sentRequest: false,
				receivedRequest: true,
			} as FriendStatusType);
		});

		notifications?.on("friend_request_accepted", (args: FriendRequestType) => {
			if (
				!(args.sender.username === currentlyLookingAt && args.target.username === myUsername) &&
				!(args.sender.username === myUsername && args.target.username === currentlyLookingAt)
			)
				return;

			setStatus({
				friends: true,
				sentRequest: false,
				receivedRequest: false,
			} as FriendStatusType);
		});

		notifications?.on("friend_request_denied", (args: FriendRequestType) => {
			if (
				!(args.sender.username === currentlyLookingAt && args.target.username === myUsername) &&
				!(args.sender.username === myUsername && args.target.username === currentlyLookingAt)
			)
				return;

			setStatus({
				friends: false,
				sentRequest: false,
				receivedRequest: false,
			} as FriendStatusType);
		});

		notifications?.on("friend_request_canceled", (args: FriendRequestType) => {
			if (
				!(args.sender.username === currentlyLookingAt && args.target.username === myUsername) &&
				!(args.sender.username === myUsername && args.target.username === currentlyLookingAt)
			)
				return;

			setStatus({
				friends: false,
				sentRequest: false,
				receivedRequest: false,
			} as FriendStatusType);
		});

		notifications?.on("unfriend", (args: FriendRequestType) => {
			if (
				!(args.sender.username === currentlyLookingAt && args.target.username === myUsername) &&
				!(args.sender.username === myUsername && args.target.username === currentlyLookingAt)
			)
				return;

			setStatus({
				friends: false,
				sentRequest: false,
				receivedRequest: false,
			} as FriendStatusType);
		});
	}, [notifications, myUsername, currentlyLookingAt, setStatus]);
};

export default useFriendStatusUpdate;
