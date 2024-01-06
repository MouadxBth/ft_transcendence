import Conversation from "./Conversation"
import { useState, useContext } from "react"
import {TabsTrigger } from "@/components/ui/tabs"
import { userContext } from "@/app/chat/userContext"
import AddChat from "./addChat"
import ChatListPrimitive from "./ChatListPrimitive"

export default function ConversationList() {

	const [activeConversation, setActiveConversation] = useState('');
	const {userData} = useContext(userContext);
	return (
		<ChatListPrimitive>
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
		</ChatListPrimitive>
	)
}