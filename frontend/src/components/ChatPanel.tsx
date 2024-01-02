'use client'

import InputField from "./InputField"
import Conversation from "./Conversation"
import Image from "next/image"
import MessagingSection from "./MessagingSection"
import React, { useState } from 'react';

import Tab from "./Tab"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
  } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import { loggedUser } from "@/app/chat/userData"
import { UserDataType } from "@/app/chat/userContext"
import { useForm } from "react-hook-form"

  


const conversationData = [
	{id: 3, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "madsquirrel"},
	{id: 1, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Dummy"},
	{id: 0, CreatedAt: "2023-12-28T21:34:42.466Z", members: [1, 2], userName: "Ray"}
]
export default function ChatPanel(props: {tab: string, changeTab: (tab: string) => void}) {
	const [newlogged, setUser] = useState(loggedUser);
	
		const handleAddUserClick = () => {
			const newUserName = prompt('Enter the name of the new user:');
			if (newUserName) {
				loggedUser.conversations.push({user: newUserName, data: []})
				setUser(prevUser => ({
					...prevUser,
					conversations: [
					  ...prevUser.conversations,
					  { user: newUserName, data: [] },
					],
				  }));
			}
		  };
	return (
		<div className="flex flex-col text-white bg-gray-600 h-full w-full">
			<div>
				<div className="flex flex-row">
					<Tab value="chat" active={props.tab === "chat" ? true : false}  handler={props.changeTab} />
					<Tab value="channel" active={props.tab === "channel" ? true : false} handler={props.changeTab} />
				</div>
				{/* <div className="relative p-6">
					<InputField className="text-black p-3 bg-gray-600" 
											label="search" type="searchbox" inputStyle="bg-inherit p-4
											border-2 border-white text-white"/>
					<Image className="absolute top-[29%] right-[12%]" src="/img/search.png" alt="search" height={50} width={50} />
				</div> */}
				<div className="flex flex-row w-full h-full overflow-y-scroll">
					<MessagingSection showItem={props.tab}/>
				</div>
			</div>
				<div>
						<button className=" rounded-full bg-white text-black" onClick={handleAddUserClick}><Plus/></button>
				</div>
		</div>
	)
}