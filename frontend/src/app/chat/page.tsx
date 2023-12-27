import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'
import ChatMessageView from '@/components/ChatMessageView'

export default function Home() {
  return (
    <main>
      <div className="flex">
		<ChatPanel/>
		<ChatMessageView/>
        {/* <div className="w-full text-white">content</div> */}
      </div>
    </main>
  )
}
