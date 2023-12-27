import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState } from "react"

const channelData = [
	{name: "random"},
	{name: "general"},
	{name: "frontend"},
	{name: "backend"}
]

export default function MessagingSection (props: {data: { id: number; CreatedAt: string; members: number[]; userName: string;}[], showItem: string}) {

	
	if (props.showItem === 'chat')
		return (
			<div>
				{props.data.map(conversation => <Conversation name={conversation.userName}/>)}
			</div>	
		)
		else
			return (
				<div>
					{channelData.map(channel => <Channel name={channel.name}/>)}
				</div>	
			)
}