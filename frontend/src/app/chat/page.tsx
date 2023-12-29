import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'
import ChatMessageView from '@/components/ChatMessageView'
import Chat from '@/components/Chat'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
	const user = "madsquirrel"
  return (
    <main>
		<Chat>
			<Tabs className='flex flex-row w-full h-screen' defaultValue="Dummy">
				<TabsList className='h-full w-[30%]'>
						<ChatPanel/>
				</TabsList>
				<TabsContent className='w-full h-screnn' id="1" value="Dummy">
					<ChatMessageView user="Dummy"/>
				</TabsContent>
				<TabsContent className='w-full h-scfeen' id="2" value={user}>
					<ChatMessageView user={user}/>
				</TabsContent>
			</Tabs>
		</Chat>
        {/* <div className="w-full text-white">content</div> */}
    </main>
  )
}
