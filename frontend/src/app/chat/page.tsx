import Image from 'next/image'
import ChatPanel from '@/components/ChatPanel'

export default function Home() {
  return (
    <main>
      <div className="flex">
		<ChatPanel/>
        <div className="w-full text-white">content</div>
      </div>
    </main>
  )
}
