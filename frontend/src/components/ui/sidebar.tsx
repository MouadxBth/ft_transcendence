import home from '@/images/HomePage.svg'
import chat from '@/images/chat.svg'
import profile from '@/images/Customer.svg'
import settings from '@/images/Settings.svg'
import logout from '@/images/Logout Rounded Left.svg'
import game from '@/images/PS Controller.svg'
import Link  from 'next/link'
import Image from 'next/image'
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
function Sidebar() {
  return (
    <div className="flex">
        <aside className="fixed flex flex-col justify-between items-center w-96 h-screen bg-white pt-12 pb-12">
        <div className="flex items-center">
          <div className="mr-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            <div className="text-xl">Ihssane Koukou</div>
            <div className="text-md text-gray-400">@ikoukou</div>
          </div>
        </div>
            <div className="grid gap-6">
              <div>
                <Link href="/">
                  <Button variant="link">
                  <Image className="mr-4" src={home} alt="" width={30} height={30}/>
                    Home
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/profile">
                  <Button variant="link">
                  <Image className="mr-4" src={profile} alt="" width={30} height={30}/>
                    Profile
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/chat">
                  <Button variant="link">
                  <Image className="mr-4" src={chat} alt="" width={30} height={30}/>
                    Chat
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/game">
                  <Button variant="link">
                  <Image className="mr-4" src={game} alt="" width={30} height={30}/>
                    Game
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/settings">
                  <Button variant="link">
                  <Image className="mr-4" src={settings} alt="" width={30} height={30}/>
                    Settings
                    </Button>
                  </Link>
              </div>
            </div>
            <div>
                <Link href="/">
                  <Button variant="link">
                  <Image className="mr-4" src={logout} alt="" width={30} height={30}/>
                    Logout
                    </Button>
                  </Link>
              </div>
        </aside>
    </div>
  )
}

export default Sidebar