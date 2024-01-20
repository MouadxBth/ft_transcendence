import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

function CustomAvatar() {
	const avatars: string[] = [
		"https://robohash.org/test",
		"https://robohash.org/test0",
		"https://robohash.org/test2",
		"https://robohash.org/test3",
		"https://robohash.org/test4",
		"https://robohash.org/test5",
	];
	const [selectedAvatar, setSelectedAvatar] = useState("https://robohash.org/test");
	const handleAvatarClick = ({ avatar }: { avatar: string }) => {
		setSelectedAvatar(avatar);
	};
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<Avatar className="h-22 w-22 text-white border-amber-500 border-2">
						<AvatarImage
							className="object-cover"
							src={selectedAvatar}
						/>
						<AvatarFallback>{"test".toUpperCase().slice(0, 2)}</AvatarFallback>
					</Avatar>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle>Choose an avatar</DialogTitle>
					<DialogHeader className="flex flex-row justify-between items-center py-14">
						{avatars.map((avatar, index) => (
							<Avatar
								key={index}
								className={`w-20 h-20 cursor-pointer ${
									selectedAvatar === avatar ? "border-2 border-amber-500" : "border-none"
								}`}
								onClick={() => handleAvatarClick({ avatar })}
							>
								<AvatarImage
									className="object-cover"
									src={avatar}
								/>
								<AvatarFallback>{"test".toUpperCase().slice(0, 2)}</AvatarFallback>
							</Avatar>
						))}
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default CustomAvatar;
