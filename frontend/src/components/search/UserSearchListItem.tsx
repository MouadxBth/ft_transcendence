"use client";

import { Separator } from "../ui/separator";
import { User } from "@/lib/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useSearch } from "@/hooks/search/useSearch";

const UserSearchListItem = ({ username, nickname, firstName, lastName, avatar }: User) => {
	const { setOpen } = useSearch();
	return (
		<>
			<Link
				href={`/profile/${username}`}
				className="flex justify-between"
				onClick={() => setOpen(false)}
			>
				<div className="flex space-x-2">
					<Avatar className="h-12 w-12">
						<AvatarImage
							className="object-cover"
							src={
								avatar
									? avatar.startsWith("http")
										? avatar
										: `${process.env.NEXT_PUBLIC_BACKEND_URL}/avatar/${avatar}`
									: ""
							}
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start">
						<div className="text-md">{nickname}</div>
						<div className="text-xs text-muted-foreground">{`${firstName} ${lastName}`}</div>
					</div>
				</div>
			</Link>
			<Separator className="my-2" />
		</>
	);
};

export default UserSearchListItem;
