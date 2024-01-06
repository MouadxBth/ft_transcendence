import Conversation from "./Conversation"
import Channel from "./Channel"
import { useState, useContext } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { userContext } from "@/app/chat/userContext"
import AddChannel from "./addChannel"
import ChatListPrimitive from "./ChatListPrimitive"

export default function ChannelList() {
	const [activeConversation, setActiveConversation] = useState('');
	const {userData} = useContext(userContext);
	return (
		<ChatListPrimitive>
			{userData.channels.map(channel => (
			<TabsTrigger className={`min-h-[70px] w-full ${activeConversation === channel.user ? 'bg-gray-500/50 text-black' : ''}`} value={channel.user} onClick={() => setActiveConversation(channel.user)}>
				<div className=" hover:bg-gray-500/50">
					<Channel name={channel.user} />
				</div>
			</TabsTrigger>
			))}
			<AddChannel />
		</ChatListPrimitive>
	)
}