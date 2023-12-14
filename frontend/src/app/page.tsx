import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <div className="flex">
        <aside className="flex flex-col pt-12 pb-12 justify-between items-center w-96 h-screen bg-white text-black">
          <div>Profile</div>
          <div className="grid gap-7">
            <div>Home</div>
            <div>Chat</div>
            <div>Game</div>
            <div>Profile</div>
            <div>Settings</div>
          </div>
          <div>
            <div className="pb-40">LOGO</div>
            <div>Logout</div>
            </div>
        </aside>
        <div className="w-full text-white">content</div>
      </div>
    </main>
  )
}
