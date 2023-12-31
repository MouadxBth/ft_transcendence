'use client'

import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'
import ChatMessageView from '@/components/ChatMessageView'
import Chat from '@/components/Chat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContext, createContext, useState } from 'react'
import { userContext, type UserDataType } from './userContext'
import { loggedUser } from './userData'

export default function Home() {
	const [userData, setUserData] = useState(loggedUser);
	console.log("triggered re-render of chat app");
	
  return (
	  <userContext.Provider value={{userData, setUserData}}>
			<main>
			  <Chat>
				  <Tabs className='flex flex-row w-full h-screen' defaultValue="Dummy">
					  <TabsList className='h-full w-[20%]'>
						  <ChatPanel />
					  </TabsList>
					  {userData.conversations.map((conversation) => {
						return (
							<TabsContent className='w-[80%] h-screnn' id="1" value={conversation.user}>
								<ChatMessageView user={conversation.user} />
							</TabsContent>
						)
					  })}
					  {/* <TabsContent className='w-[80%] h-scfeen' id="2" value={userData.name}>
						  <ChatMessageView user={userData.name} />
					  </TabsContent> */}
				  </Tabs>
			  </Chat>
		  </main>
	  </userContext.Provider>
  )
}
