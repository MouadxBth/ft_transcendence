import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useId } from "react"


const channelData = [
	{name: "random"},
	{name: "general"},
	{name: "frontend"},
	{name: "backend"}
]

export default function MessagingSection (props: {data: { id: number; CreatedAt: string; members: number[]; userName: string;}[], showItem: string}) {

	
	if (props.showItem === 'chat')
		return (
			<div className="h-full w-full">
				{props.data.map(conversation => (
								<TabsTrigger className="w-full" value={conversation.userName}>
									<Conversation name={conversation.userName}/>
								</TabsTrigger>
								))}
			</div>
		)
		else
			return (
				<div>
					{channelData.map(channel => <Channel name={channel.name}/>)}
				</div>	
			)
}