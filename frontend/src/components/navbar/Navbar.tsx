"use client";

import React from "react";
import { CircleUserRound, Gamepad2, Home, MessagesSquare } from "lucide-react";
import NavbarTitle from "./NavbarTitle";
import NavbarLinks, { NavbarItemContent } from "./NavbarLinks";
import UserSearch from "../search/UserSearch";

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
];

const Navbar = () => {
	return (
		<nav className="flex flex-row items-center h-20 justify-between px-5">
			<NavbarTitle />
			<UserSearch />
			<NavbarLinks links={links} />
		</nav>
	);
};

export default Navbar;
