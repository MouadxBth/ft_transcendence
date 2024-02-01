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

export interface ChannelHeader {
	name: string;
}

async function handleLeave() {
	const res = leaveChannel
}

const ChannelHeader = ({ name }: ChannelHeader) => {
	return (
		<Menubar>
			<MenubarMenu>
					<div className="w-full flex items-center justify-center p-2">
				<MenubarTrigger>
						{name}
				</MenubarTrigger>
					</div>
				<MenubarContent>
					<MenubarItem onClick={() => console.log("clicked")}>
						leave channel
					</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
};

export default ChannelHeader;
