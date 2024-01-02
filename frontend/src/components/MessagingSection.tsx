import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userContext } from "@/app/chat/userContext"
import AddChat from "./addChat"
import AddChannel from "./addChannel"


export default function MessagingSection (props: {showItem: string}) {

	const {userData} = useContext(userContext);
	if (props.showItem === 'chat')
		return (
			<div className="h-full w-full">
				{userData.conversations.map(conversation => (
								<TabsTrigger className="min-h-[70px] w-full" value={conversation.user}>
									<Conversation name={conversation.user}/>
								</TabsTrigger>
								))}
								<AddChat/>
			</div>
		)
		else
		return (
			<div className="h-full w-full">
				{userData.channels.map(channel => (
					<TabsTrigger className="w-full" value={channel.user}>
						<Channel name={channel.user} />
					</TabsTrigger>
				))}
				<AddChannel/>
			</div>	
			)
}