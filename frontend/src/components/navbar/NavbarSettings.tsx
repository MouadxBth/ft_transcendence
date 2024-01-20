import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

const NavbarSettings = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<li className="cursor-pointer uppercase text-lg text-gray-500 hover:scale-110 hover:text-white duration-200">
					<Settings />
				</li>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`}
						className="flex space-x-2"
					>
						<div>Log Out</div>
						<LogOut className="w-5 h-auto" />
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default NavbarSettings;
