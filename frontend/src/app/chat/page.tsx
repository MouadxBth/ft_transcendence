'use client'

import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'
import ChatMessageView from '@/components/ChatMessageView'
import Chat from '@/components/Chat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContext, createContext, useState } from 'react'
import { userContext, type UserDataType } from './userContext'
import { loggedUser } from './userData'
import ConverationMessageView from '@/components/ConversationMessageView'
import ChannelMessageView from '@/components/ChannelMessageView'


export default function Home() {
	const [userData, setUserData] = useState(loggedUser);
	console.log("triggered re-render of chat app");
	
	const [tab, setTab] = useState("chat");

	function handleSectionClick(tab: string) {
		console.log("was clicked!");
		setTab(tab);
	}
	
return (
	<userContext.Provider value={{ userData, setUserData }}>
		<main>
			<Chat>
				<Tabs className='flex flex-row w-full h-screen' defaultValue="">
					<TabsList className='h-full flex-initial py-1 w-[250px] bg-black'>
						<ChatPanel tab={tab} changeTab={handleSectionClick} />
					</TabsList>
					{
						tab === "chat" ? (userData.conversations.map((conversation) => {
							return (
								<TabsContent className='w-full h-screnn' id="1" value={conversation.user}>
									<ConverationMessageView user={conversation.user} />
								</TabsContent>
							)
						})) : (userData.channels.map((channel) => {
							return (
								<TabsContent className='w-full h-screnn' id="1" value={channel.user}>
									<ChannelMessageView user={channel.user} />
								</TabsContent>
							)
						}))
					}
				</Tabs>
			</Chat>
		</main>
	</userContext.Provider>
)
}
