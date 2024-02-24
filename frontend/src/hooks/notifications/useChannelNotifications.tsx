import { useEffect } from "react";
import useSockets from "../socket/useSockets";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { formattedDate } from "@/lib/utils";
import { ChannelType } from "@/lib/types/channel/channel";
import { ChannelMemberType } from "@/lib/types/channel/channel-member";
import { ChannelOperationResultType } from "@/lib/types/channel/channel-operation-result";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

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
	const { toast } = useToast();
	const queryClient = useQueryClient();

	useEffect(() => {
		channels?.on("channel_created", (args: ChannelType) => {
			toast({
				title: "Channels",
				className: "rounded",
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

		// toast({
		// 	title: "Channels",
		// 	className: "rounded",
		// 	description: ,
		// });

		channels?.on("channel_deleted", (args: ChannelType) => {
			toast({
				title: "Channels",
				className: "rounded",
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
				return toast({
					title: "Channels",
					className: "rounded",
					description: `You have joined channel ${channel.name}`,
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				description: `${member.user.nickname} has joined channel ${channel.name}`,
			});
		});

		channels?.on("member_left", (channel: ChannelType, member: ChannelMemberType) => {
			if (authenticatedUser?.user.username === member.user.username) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: `You have left channel ${channel.name}`,
				});
			}
			let message = `${member.user.nickname} has left channel ${channel.name}`;

			if (channel.owner.username === member.user.username) {
				message = `Owner ${member.user.nickname} has deleted channel ${channel.name}`;
			}

			toast({
				title: "Channels",
				className: "rounded",
				description: message,
			});
		});

		channels?.on("invite_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully invited!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to invite user!",
			});
		});

		channels?.on("invited_to_channel", (args: ChannelOperationResultType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `You have been invited to channel "${args.channel}" by "${args.sender}"`,
			});
		});

		channels?.on("ban_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully banned!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to ban user!",
			});
		});

		channels?.on("banned_from_channel", (args: ChannelOperationResultType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `You have been banned from channel "${args.channel}" by "${args.sender}"`,
			});

			channels.emit("leave_room", args.channel);
		});

		channels?.on("kick_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully kicked!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to kick user!",
			});
		});

		channels?.on("kicked_from_channel", (args: ChannelOperationResultType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `You have been kicked from channel "${args.channel}" by "${args.sender}"`,
			});

			channels.emit("leave_room", args.channel);
		});

		channels?.on("unban_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully unbanned!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to unban user!",
			});
		});

		channels?.on("unbanned_from_channel", (args: ChannelOperationResultType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `You have been unbanned from channel "${args.channel}" by "${args.sender}"`,
			});
		});

		channels?.on("promote_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully promoted!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to promote user!",
			});
		});

		channels?.on(
			"promoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username === issuer.sender) return;

				if (authenticatedUser?.user.username === member.user.username) {
					queryClient.invalidateQueries({ queryKey: ["channel", channel.name] });
					return toast({
						title: "Channels",
						className: "rounded",
						description: `You have been promoted to Admin in channel "${channel.name}" by "${issuer.sender}"`,
					});
				}

				return toast({
					title: "Channels",
					className: "rounded",
					description: `${member.user.nickname} has been promoted to Admin in channel "${channel.name}" by "${issuer.sender}"`,
				});
			}
		);

		channels?.on("demote_successful", (args: boolean) => {
			if (args) {
				return toast({
					title: "Channels",
					className: "rounded",
					description: "User successfully demoted!",
				});
			}

			toast({
				title: "Channels",
				className: "rounded",
				variant: "destructive",
				description: "Unable to demote user!",
			});
		});

		channels?.on(
			"demoted_in_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username === issuer.sender) return;

				if (authenticatedUser?.user.username === member.user.username) {
					queryClient.invalidateQueries({ queryKey: ["channel", channel.name] });
					return toast({
						title: "Channels",
						className: "rounded",
						description: `You have been demoted to Member in channel "${channel.name}" by "${issuer.sender}"`,
					});
				}

				return toast({
					title: "Channels",
					className: "rounded",
					description: `${member.user.nickname} has been demoted to Member in channel "${channel.name}" by "${issuer.sender}"`,
				});
			}
		);

		channels?.on("mute_successful", (member: ChannelMemberType) => {
			return toast({
				title: "Channels",
				className: "rounded",
				description: "User successfully muted!",
			});
		});

		channels?.on("unmute_successful", (member: ChannelMemberType) => {
			return toast({
				title: "Channels",
				className: "rounded",
				description: "User successfully unmuted!",
			});
		});

		channels?.on(
			"muted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username !== member.user.username) return;

				return toast({
					title: "Channels",
					className: "rounded",
					description: `You have been muted on channel "${channel.name}" by "${issuer.sender}" for ${issuer.duration} seconds!`,
				});
			}
		);

		channels?.on(
			"unmuted_on_channel",
			(channel: ChannelType, member: ChannelMemberType, issuer: ChannelOperationResultType) => {
				if (authenticatedUser?.user.username !== member.user.username) return;

				return toast({
					title: "Channels",
					className: "rounded",
					description: `You have been unmuted on channel "${channel.name}"!`,
				});
			}
		);

		channels?.on("password_added", (args: ChannelType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `Successfully added a password to channel "${args.name}"`,
			});
		});

		channels?.on("password_modified", (args: ChannelType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `Successfully modified the password of channel "${args.name}"`,
			});
		});

		channels?.on("password_deleted", (args: ChannelType) => {
			toast({
				title: "Channels",
				className: "rounded",
				description: `Successfully deleted the password of channel "${args.name}"`,
			});
		});
	}, [channels, queryClient, authenticatedUser, toast]);
};

export default useChannelNotifications;
