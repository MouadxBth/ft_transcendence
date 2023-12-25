"use client"
import Link  from 'next/link'
import Image from 'next/image'
import { Button } from './button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { CircleUserRound, Eye, Gamepad2, Home, LogOut, MessagesSquare, Pencil, Settings } from 'lucide-react'
import { usePathname } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"




function Navbar() {
  const links = [
    {
      id: 1,
      link: "/",
      icon: Home,
    },
    {
      id: 2,
      link: "/profile",
      icon: CircleUserRound,
    },
    {
      id: 3,
      link: "/game",
      icon: Gamepad2,
    },
    {
      id: 4,
      link: "/chat",
      icon: MessagesSquare,
    },
    {
      id: 5,
      link: "/settings",
      icon: Settings,
    },
  ];
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  console.log('Pathname ', pathname);
  return (
    <nav className="flex md:justify-between justify-end items-center w-full h-20 px-4 text-white fixed">
      <div className="hidden md:flex">
        <HoverCard>
          <HoverCardTrigger className="flex justify-center items-center px-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="pl-4">Full Name</div>
          </HoverCardTrigger>
          <HoverCardContent>
            <Card>
              <CardHeader className="flex justify-center items-center">
                <CardTitle>Full Name</CardTitle>
                <CardDescription className="text-lg">level</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <Link href="profile">
                  <Eye className="mr-4 w-5 h-5 hover:scale-110"/>
                </Link>
                <Pencil className="mr-4 w-5 h-5 hover:scale-110"/>
                <LogOut className="w-5 h-5 hover:scale-110"/>
              </CardContent>
            </Card>
          </HoverCardContent>
        </HoverCard>
      </div>
        <ul className="hidden md:flex ">
        {links.map(({ id, link, icon:Icon}) => (
          <li
            key={id}
            className={`${pathname === link.toLowerCase()? "text-white " : "text-gray-500"} px-6 cursor-pointer uppercase text-lg text-gray-500 hover:scale-110 hover:text-white duration-200`}
          >
            <Link href={link}><Icon/></Link>
          </li>
        ))}
        </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>
      {nav && (
        <ul className="flex flex-col justify-evenly items-center absolute top-0 left-0 w-full h-screen bg-black text-gray-500 md:hidden">
          <div className="flex flex-col justify-center items-center text-white text-xl">
            <Avatar className="mb-4 h-20 w-20 text-white">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="text-white text-xl">
            Full Name
          </div>
          </div>
          <div>
          {links.map(({ id, link, icon:Icon }) => (
            <li
              key={id}
              className={`${pathname === link.toLowerCase()? "text-white " : "text-gray-500"} cursor-pointer py-4 uppercase hover:scale-110 hover:text-white duration-200`}
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                <Icon className=" sm:h-12 sm:w-12 h-9 w-9"/>
              </Link>
            </li>
          ))}
          </div>
          <li>
            <LogOut className="sm:h-12 sm:w-12 h-9 w-9 cursor-pointer hover:scale-110 hover:text-white duration-200"/>
          </li>
        </ul>
      )}
      

    </nav>
  )
}

export default Navbar