'use client'

import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'
import ChatMessageView from '@/components/ChatMessageView'
import Chat from '@/components/Chat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContext, createContext, useState } from 'react'
import { userContext, type UserDataType } from './userContext'
import { loggedUser } from './userData'

const data = [
	{id: 0, createdAt: "00", updatedAt: "11"},
	{id: 1, createdAt: "00", updatedAt: "11"},
	{id: 2, createdAt: "00", updatedAt: "11"},
]


export default function Home() {
	const [userData, setUserData] = useState(loggedUser);
	console.log("triggered re-render of chat app");
	
	const [toggle, setToggle] = useState("chat");

	function handleSectionClick(tab: string) {
		console.log("was clicked!");
		setToggle(tab);
	}
	
  return (
	  <userContext.Provider value={{userData, setUserData}}>
			<main>
			  <Chat>
				  <Tabs className='flex flex-row w-full h-screen' defaultValue="Dummy">
					  <TabsList className='h-screen w-[20%]'>
						  <ChatPanel tab={toggle} changeTab={handleSectionClick} />
					  </TabsList>
					  {
						toggle === "chat" ? (userData.conversations.map((conversation) => {
							return (
								<TabsContent className='w-[80%] h-screnn' id="1" value={conversation.user}>
									<ChatMessageView tab={toggle} user={conversation.user} />
								</TabsContent>
							)})) : (userData.channels.map((channel) => {
								return (
									<TabsContent className='w-[80%] h-screnn' id="1" value={channel.user}>
										<ChatMessageView tab={toggle} user={channel.user} />
									</TabsContent>
								)}))
					  }
					  {/* <TabsContent className='w-[80%] h-scfeen' id="2" value={userData.name}>
						  <ChatMessageView user={userData.name} />
					  </TabsContent> */}
				  </Tabs>
			  </Chat>
		  </main>
	  </userContext.Provider>
  )
}
