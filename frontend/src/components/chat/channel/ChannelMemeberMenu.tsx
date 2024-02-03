import React from "react";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
  } from "@/components/ui/menubar"

import { MoreVertical } from "lucide-react";
import { useChannelContext } from "@/hooks/useChannelContext";
import { findChannelItem } from "@/lib/chat/utils";
import { toast } from "@/components/ui/use-toast";
import { toastError } from "@/lib/error-handling/toast-error";
import { ApiChannelMember, addChannelAdmin, banChannelMember, blockChannelMember, muteChannelMember } from "@/lib/chat/channel/channel-admin";
import { ChannelMemberListItemProps } from "./member/ChannelMemberListItem";
import { ChannelUserApiResponse } from "@/lib/types/channel-api-response";
import useAuthenticatedUser from "@/hooks/authentication/useAuthenticatedUser";

const ChannelMemberMenu = (member: ApiChannelMember) => {

	const {channelData} = useChannelContext();
	const { data } = useAuthenticatedUser();
	const loggedUser = data?.user.username;
	const { status, ownerId } = findChannelItem(member.channel, channelData)!

	async function handleAdmin() {
		try {
			await addChannelAdmin(member);
			toast({
				title: `${member.member} has been muted`
			})
		} catch(e) {
			toastError(e);
		}
	}

	async function handleMute() {
		try {
			await muteChannelMember(member);
			toast({
				title: `${member.member} is now admin of ${member.channel}`
			})
		} catch(e) {
			toastError(e);
		}
	}

	async function handleBan() {
		try {
			await banChannelMember(member);
			toast({
				title: `${member.member} is banned from ${member.channel}`
			})
		} catch(e) {
			toastError(e);
		}
	}

	async function handleBlock() {
		try {
			await blockChannelMember(member);
			toast({
				title: `You blocked ${member.member} on ${member.channel}`
			})
		} catch(e) {
			toastError(e);
		}
	}

	return (
		<>
			<div className="justify-self-end">
				<Menubar className="border-0">
					<MenubarMenu>
						<MenubarTrigger >
							<MoreVertical />
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem onSelect={handleAdmin}>
								Make admin
							</MenubarItem>
							<MenubarItem onSelect={handleMute} >
								Mute
							</MenubarItem>
							<MenubarItem disabled={ownerId != loggedUser} onSelect={handleBan}>
								Ban
							</MenubarItem>
							<MenubarItem onSelect={handleBlock}>
								Block
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>
		</>
	)
}

export default ChannelMemberMenu;