'use client'
import MessagingSection from "./MessagingSection"
import React, { useState } from 'react';

import Tab from "./Tab"
import { ScrollArea } from "./ui/scroll-area";


export default function  ChatPanel(props: {tab: string, changeTab: (tab: string) => void}) {
	return (
		<div className="flex flex-col overflow-auto text-white w-full h-full border rounded-xl border-gray-500 ">
			<div className="flex mb-2">
				<Tab value="chat" active={props.tab === "chat" ? true : false} handler={props.changeTab} />
				<Tab value="channel" active={props.tab === "channel" ? true : false} handler={props.changeTab} />
			</div>
			<ScrollArea className="h-screen">
				<MessagingSection className="border-white" showItem={props.tab} />
			</ScrollArea>
		</div>
	)
}