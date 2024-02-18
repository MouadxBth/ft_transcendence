import React from "react";
import { CircleUserRound, Gamepad2, Home, LogOut, MessagesSquare, Settings } from "lucide-react";
import NavbarTitle from "./NavbarTitle";
import UserSearch from "../search/UserSearch";
import SearchContextProvider from "@/providers/SearchContextProvider";
import NavbarLinkList, { NavbarItemContent } from "./NavbarLinkList";

export const links: NavbarItemContent[] = [
	{
		id: 1,
		link: "/",
		Icon: Home,
	},
	{
		id: 2,
		link: "/profile",
		Icon: CircleUserRound,
	},
	{
		id: 3,
		link: "/game",
		Icon: Gamepad2,
	},
	{
		id: 4,
		link: "/chat",
		Icon: MessagesSquare,
	},
	{
		id: 5,
		link: "/settings",
		Icon: Settings,
	},

	{
		id: 6,
		link: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
		Icon: LogOut,
	},
];

const Navbar = () => {
	return (
		<nav className="flex flex-row items-center h-20 justify-between px-5 border-b">
			<NavbarTitle />
			<SearchContextProvider>
				<UserSearch />
			</SearchContextProvider>
			<NavbarLinkList links={links} />
		</nav>
	);
};

export default Navbar;
