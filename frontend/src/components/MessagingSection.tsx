import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userContext } from "@/app/chat/userContext"
import AddChat from "./addChat"
import AddChannel from "./addChannel"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

  


export default function MessagingSection (props: {className?: string,showItem: string}) {

	const [activeConversation, setActiveConversation] = useState('');
	const {userData} = useContext(userContext);
	
	if (props.showItem === 'chat')
		return (
			<div className="h-full w-full ">
				{userData.conversations.map(conversation => (
					<div>
						<TabsTrigger className={`min-h-[70px] w-full ${activeConversation === conversation.user ? 'bg-gray-500/50 text-black' : ''}`} value={conversation.user} onClick={() => setActiveConversation(conversation.user)}>
							<div className=" hover:bg-gray-500/50">
								<Conversation name={conversation.user} />
							</div>
						</TabsTrigger>
					</div>
				))}
				<AddChat />
			</div>
		)
		else
		return (
			<div className="h-full w-full">
				{userData.channels.map(channel => (
					<div>
					<ContextMenu>
					<ContextMenuTrigger>
					<TabsTrigger className={`min-h-[70px] w-full ${activeConversation === channel.user ? 'bg-gray-500/50 text-black' : ''}`} value={channel.user} onClick={() => setActiveConversation(channel.user)}>
									<div className=" hover:bg-gray-500/50"><Channel name={channel.user}/></div>
								</TabsTrigger>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuItem>Leave channel</ContextMenuItem>
					</ContextMenuContent>
					</ContextMenu>
								</div>
				))}
				<AddChannel/>
			</div>	
			)
}