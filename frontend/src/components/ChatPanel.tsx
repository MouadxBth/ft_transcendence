'use client'

import InputField from "./InputField"
import Conversation from "./Conversation"
import Image from "next/image"
import MessagingSection from "./MessagingSection"
import { useState } from "react"
import Tab from "./Tab"


const conversationData = [
	{id: 3, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "madsquirrel"},
	{id: 1, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Dummy"},
	{id: 0, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Ray"}
]

export default function ChatPanel() {
	
	const [toggle, setToggle] = useState("chat");

	function handleSectionClick(tab: string) {
		console.log("was clicked!");
		setToggle(tab);
	}
	
	return (
		<div className="text-white bg-gray-600 h-full">
			<div className="flex flex-row">
				<Tab value="chat" active={toggle === "chat" ? true : false}  handler={handleSectionClick} />
				<Tab value="channel" active={toggle === "channel" ? true : false} handler={handleSectionClick} />
			</div>
			{/* <div className="relative p-6">
				<InputField className="text-black p-3 bg-gray-600" 
										label="search" type="searchbox" inputStyle="bg-inherit p-4
										border-2 border-white text-white"/>
				<Image className="absolute top-[29%] right-[12%]" src="/img/search.png" alt="search" height={50} width={50} />
			</div> */}
			<div className="h-full w-full overflow-y-scroll p-2">
				<MessagingSection data={conversationData} showItem={toggle}/>
			</div>
		</div>
	)
}