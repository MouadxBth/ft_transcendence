import React, { useState } from "react";
import { leaveChannel } from "@/lib/chat/channel/channel-service-endpoints";
import { toast } from "@/components/ui/use-toast";
import { toastError } from "@/lib/error-handling/toast-error";
import { useChannelContext } from "@/hooks/useChannelContext";
import ChannelMemberList from "./member/ChannelMemberList";
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

const ChannelHeaderMenu = ({name}: {name: string}) => {

	const {channelData} = useChannelContext()
	
	const [memberListOpen, setMemberListOpen] = useState(false);
	
	const { status } = channelData!.find((item) => item.name == name)!;

	async function handleLeave() {
		try {
			await leaveChannel(name);
			toast({
				title: "left channel: " + name
			})
		} catch(e) {
			toastError(e);
		}
	}

	return (
		<>
			{
				memberListOpen && <ChannelMemberList name={name} setMemberListOpen={setMemberListOpen} />
			}
			<div className="justify-self-end">
				<Menubar className="border-0">
					<MenubarMenu>
						<MenubarTrigger >
							<MoreVertical />
						</MenubarTrigger>
						<MenubarContent>
							<MenubarItem onSelect={() => setMemberListOpen(true)}>
								Members
							</MenubarItem>
							<MenubarItem onSelect={handleLeave}>
								leave channel
							</MenubarItem>
							{status == "PROTECTED" ? <MenubarItem onSelect={handleLeave}>
								change password
							</MenubarItem> : <></>}
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</div>
		</>
	)
}

export default ChannelHeaderMenu;