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
    <div className="lg:flex hidden">
        <aside className="flex flex-col justify-between items-center 2xl:w-96 w-72 h-screen bg-white pt-12 pb-12">
        <div className="2xl:flex 2xl:flex-row flex flex-col justify-center items-center">
          <div className="2xl:mr-4 mr-2">
            <Avatar>
              <AvatarImage src="https://robohash.org/ikoukou" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            <div className="text-xl">Ihssane Koukou</div>
            <div className="2xl:flex 2xl:justify-start flex justify-center text-sm text-gray-400">@ikoukou</div>
          </div>
        </div>
            <div className="grid 2xl:gap-6 gap-3">
              <div>
                <Link href="/">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={home} alt="" width={30} height={30}/>
                    Home
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/profile">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={profile} alt="" width={30} height={30}/>
                    Profile
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/chat">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={chat} alt="" width={30} height={30}/>
                    Chat
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/game">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={game} alt="" width={30} height={30}/>
                    Game
                    </Button>
                  </Link>
              </div>
              <div>
                <Link href="/settings">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={settings} alt="" width={30} height={30}/>
                    Settings
                    </Button>
                  </Link>
              </div>
            </div>
            <div>
                <Link href="/">
                  <Button variant="link">
                  <Image className="2xl:mr-4 mr-2" src={logout} alt="" width={30} height={30}/>
                    Logout
                    </Button>
                  </Link>
              </div>
        </aside>
    </div>
  )
}

export default Sidebar