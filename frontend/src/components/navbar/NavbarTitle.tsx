"use client";

import { useAuthentication } from "@/contexts/AuthenticationContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const NavbarTitle = () => {
	const { authenticatedUser } = useAuthentication();

	if (!authenticatedUser) return null;

	const avatar = authenticatedUser.user.avatar;

	return (
		<div className="flex flex-row items-center space-x-3 w-1/2">
			<Avatar className="h-14 w-auto text-white border-amber-500 border-2">
				<AvatarImage
					className="object-cover"
					src={
						avatar
							? avatar.startsWith("http")
								? avatar
								: `http://localhost:3000/api/v1/avatar/${avatar}`
							: ""
					}
				/>
				<AvatarFallback>
					{authenticatedUser.user.nickname?.toUpperCase().slice(0, 2)}
				</AvatarFallback>
			</Avatar>

			<div>
				<div className="text-white text-xl">{authenticatedUser.user.nickname}</div>
				<p className="text-sm text-muted-foreground">{`${authenticatedUser.user.firstName || ""} ${
					authenticatedUser.user.lastName || ""
				}`}</p>
			</div>
		</div>
	);
};

export default NavbarTitle;
