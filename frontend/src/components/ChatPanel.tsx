'use client'
import MessagingSection from "./MessagingSection"
import React, { useState } from 'react';

import Tab from "./Tab"
import { ScrollArea } from "./ui/scroll-area";

const conversationData = [
	{id: 3, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "madsquirrel"},
	{id: 1, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Dummy"},
	{id: 0, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Ray"}
]
export default function ChatPanel(props: {tab: string, changeTab: (tab: string) => void}) {
	return (
		<div className="flex flex-col overflow-auto text-white w-full h-full border rounded-xl border-gray-500 ">
				<div className="flex mb-2">
					<Tab value="chat" active={props.tab === "chat" ? true : false}  handler={props.changeTab} />
					<Tab value="channel" active={props.tab === "channel" ? true : false} handler={props.changeTab} />
				</div>
				{/* <div className="relative p-6">
					<InputField className="text-black p-3 bg-gray-600" 
											label="search" type="searchbox" inputStyle="bg-inherit p-4
											border-2 border-white text-white"/>
					<Image className="absolute top-[29%] right-[12%]" src="/img/search.png" alt="search" height={50} width={50} />
				</div> */}
						<ScrollArea className="h-screen">
							<MessagingSection className="border-white" showItem={props.tab}/>
						</ScrollArea>
		</div>
	)
}