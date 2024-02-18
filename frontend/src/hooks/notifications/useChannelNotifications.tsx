import { useEffect } from "react";
import useSockets from "../socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { toast as sonner } from "sonner";
import { formattedDate } from "@/lib/utils";
import { ChannelType } from "@/lib/types/channel/channel";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { ChannelOperationResultType } from "@/lib/types/channel/channel-operation-result";
import { useQueryClient } from "@tanstack/react-query";

const ChannelData = ({
	name,
	createdAt,
	topic,
	message,
}: {
	name: string;
	createdAt: string;
	topic: string | null;
	message: string;
}) => {
	return (
		<div className="flex flex-col">
			<div className="text-xs">{formattedDate(createdAt)}</div>
			<div className="pt-2 pb-1">{name}</div>
			<div className="text-xs">{topic ? topic : ""}</div>
			<div className="text-xs">{message}</div>
		</div>
	);
};

const useChannelNotifications = () => {
	const { authenticatedUser } = useAuthentication();
	const { channels } = useSockets();
	const queryClient = useQueryClient();

	useEffect(() => {
		channels?.on("channel_created", (args: ChannelType) => {
			sonner.success("Channels", {
				description: (
					<ChannelData
						name={args.name}
						createdAt={args.createdAt}
						topic={args.topic}
						message="Channel successfully created!"
					/>
				),
			});
		});

		channels?.on("channel_deleted", (args: ChannelType) => {
			sonner.success("Channels", {
				description: (
					<ChannelData
						name={args.name}
						createdAt={args.createdAt}
						topic={args.topic}
						message="Channel successfully deleted!"
					/>
				),
			});
		});

		channels?.on("member_joined", (channel: ChannelType, member: ChannelMemberType) => {
			if (authenticatedUser?.user.username === member.user.username) {
				return sonner.success("Channels", {
					description: `You have joined channel ${channel.name}`,
				});
			}

			sonner.success("Channels", {
				description: `${member.user.nickname} has joined channel ${channel.name}`,
			});
		});

		channels?.on("member_left", (channel: ChannelType, member: ChannelMemberType) => {
			if (authenticatedUser?.user.username === member.user.username) {
				return sonner.info("Channels", {
					description: `You have left channel ${channel.name}`,
				});
			}
			let message = `${member.user.nickname} has left channel ${channel.name}`;

			if (channel.owner.username === member.user.username) {
				message = `Owner ${member.user.nickname} has deleted channel ${channel.name}`;
			}

			sonner.info("Channels", {
				description: message,
			});
		});

		channels?.on("invite_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully invited!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to invite user!",
			});
		});

		channels?.on("invited_to_channel", (args: ChannelOperationResultType) => {
			sonner.info("Channels", {
				description: `You have been invited to channel "${args.channel}" by "${args.sender}"`,
			});
		});

		channels?.on("ban_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully banned!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to ban user!",
			});
		});

		channels?.on("banned_from_channel", (args: ChannelOperationResultType) => {
			sonner.info("Channels", {
				description: `You have been banned from channel "${args.channel}" by "${args.sender}"`,
			});

			channels.emit("leave_room", args.channel);
		});

		channels?.on("kick_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully kicked!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to kick user!",
			});
		});

		channels?.on("kicked_from_channel", (args: ChannelOperationResultType) => {
			sonner.info("Channels", {
				description: `You have been kicked from channel "${args.channel}" by "${args.sender}"`,
			});

			channels.emit("leave_room", args.channel);
		});

		channels?.on("unban_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully unbanned!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to unban user!",
			});
		});

		channels?.on("unbanned_from_channel", (args: ChannelOperationResultType) => {
			sonner.info("Channels", {
				description: `You have been unbanned from channel "${args.channel}" by "${args.sender}"`,
			});
		});

		channels?.on("promote_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully promoted!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to promote user!",
			});
		});

		channels?.on(
			"promoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username === issuer.sender) return;

				if (authenticatedUser?.user.username === member.user.username) {
					queryClient.invalidateQueries({ queryKey: ["channel", channel.name] });
					return sonner.success("Channels", {
						description: `You have been promoted to Admin in channel "${channel.name}" by "${issuer.sender}"`,
					});
				}

				return sonner.success("Channels", {
					description: `${member.user.nickname} has been promoted to Admin in channel "${channel.name}" by "${issuer.sender}"`,
				});
			}
		);

		channels?.on("demote_successful", (args: boolean) => {
			if (args) {
				return sonner.success("Channels", {
					description: "User successfully demoted!",
				});
			}

			sonner.error("Channels", {
				description: "Unable to demote user!",
			});
		});

		channels?.on(
			"demoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username === issuer.sender) return;

				if (authenticatedUser?.user.username === member.user.username) {
					queryClient.invalidateQueries({ queryKey: ["channel", channel.name] });
					return sonner.success("Channels", {
						description: `You have been demoted to Member in channel "${channel.name}" by "${issuer.sender}"`,
					});
				}

				return sonner.success("Channels", {
					description: `${member.user.nickname} has been demoted to Member in channel "${channel.name}" by "${issuer.sender}"`,
				});
			}
		);

		channels?.on("mute_successful", (member: ChannelMemberType) => {
			return sonner.success("Channels", {
				description: "User successfully muted!",
			});
		});

		channels?.on("unmute_successful", (member: ChannelMemberType) => {
			return sonner.success("Channels", {
				description: "User successfully unmuted!",
			});
		});

		channels?.on(
			"muted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username !== member.user.username) return;

				return sonner.info("Channels", {
					description: `You have been muted on channel "${channel.name}" by "${issuer.sender}" for ${issuer.duration} seconds!`,
				});
			}
		);

		channels?.on(
			"unmuted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username !== member.user.username) return;

				return sonner.info("Channels", {
					description: `You have been unmuted on channel "${channel.name}"!`,
				});
			}
		);
	}, [channels, queryClient, authenticatedUser]);
};

export default useChannelNotifications;
