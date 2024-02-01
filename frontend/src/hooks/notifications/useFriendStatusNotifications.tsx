import { useEffect } from "react";
import { FriendRequestType } from "@/lib/types/friend/friend-request";
import { useAuthentication } from "../authentication/useAuthentication";
import useSockets from "../socket/useSockets";
import { toast as sonner } from "sonner";
import { useRouter } from "next/navigation";

const useFriendStatusNotifications = () => {
	const { notifications } = useSockets();
	const { authenticatedUser } = useAuthentication();
	const { push } = useRouter();

	const myUsername = authenticatedUser?.user.username!;

	useEffect(() => {
		notifications?.on("sent_friend_request", (args: FriendRequestType) => {
			if (args.sender.username !== myUsername) return;

			sonner("Friends", {
				description: `You've sent a friend request to ${args.target.nickname}`,
			});
		});

		notifications?.on("receive_friend_request", (args: FriendRequestType) => {
			if (args.target.username !== myUsername) return;

			sonner.info("Friends", {
				description: `${args.sender.nickname} sent a friend request`,
				action: {
					label: "Reply",
					onClick: () => push(`/profile/${args.sender.username}`),
				},
			});
		});

		notifications?.on("friend_request_accepted", (args: FriendRequestType) => {
			if (myUsername === args.sender.username) {
				sonner.success("Friends", {
					description: `${args.target.nickname} accepted your friend request`,
				});
			} else if (myUsername === args.target.username) {
				sonner.success("Friends", {
					description: `You accepted ${args.sender.nickname}'s friend request`,
				});
			}
		});

		notifications?.on("friend_request_denied", (args: FriendRequestType) => {
			if (myUsername === args.sender.username) {
				sonner.warning("Friends", {
					description: `${args.target.nickname} denied your friend request`,
				});
			} else if (myUsername === args.target.username) {
				sonner.info("Friends", {
					description: `You denied ${args.sender.nickname}'s friend request`,
				});
			}
		});

		notifications?.on("friend_request_canceled", (args: FriendRequestType) => {
			if (myUsername === args.sender.username) {
				sonner.info("Friends", {
					description: `You canceled your friend request to ${args.target.nickname}`,
				});
			} else if (myUsername === args.target.username) {
				sonner.warning("Friends", {
					description: `${args.sender.nickname} canceled his friend request`,
				});
			}
		});

		notifications?.on("unfriend", (args: FriendRequestType) => {
			if (myUsername === args.sender.username) {
				sonner.warning("Friends", {
					description: `${args.target.nickname} unfriended you`,
				});
			} else if (myUsername === args.target.username) {
				sonner.info("Friends", {
					description: `You unfriended ${args.sender.nickname}`,
				});
			}
		});
	}, [notifications, myUsername, push]);
};

export default useFriendStatusNotifications;
