"use client";

import { usePathname } from "next/navigation";
import Item from "./NavbarItem";
import { LucideIcon } from "lucide-react";
import NavbarSettings from "./NavbarSettings";
import NavbarItem from "./NavbarItem";

export interface NavbarItemContent {
	id: number;
	link: string;
	Icon: LucideIcon;
}

export interface NavbarLinksProps {
	links: NavbarItemContent[];
}

const NavbarLinks = ({ links }: NavbarLinksProps) => {
	const pathname = usePathname();

	return (
		<ul className="flex w-1/2 justify-between">
			{links.map(({ id, link, Icon }) => (
				<NavbarItem
					key={id}
					link={link}
					Icon={Icon}
					active={pathname === link.toLowerCase()}
				/>
			))}
			<NavbarSettings />
		</ul>
	);
};

export default NavbarLinks;
