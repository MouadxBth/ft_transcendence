import { LucideIcon } from "lucide-react";
import Link from "next/link";

export interface NavbarLinkItemProps {
	active: boolean;
	link: string;
	Icon: LucideIcon;
}

const NavbarLinkItem = ({ active, link, Icon }: NavbarLinkItemProps) => {
	return (
		<li
			className={`${
				active ? "text-white " : "text-gray-500"
			} cursor-pointer uppercase text-lg text-gray-500 hover:scale-110 hover:text-white duration-200`}
		>
			<Link href={link}>
				<Icon />
			</Link>
		</li>
	);
};

export default NavbarLinkItem;
