import React, { ChangeEvent, useState } from "react";
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
import { Button } from "../ui/button";

function CustomAvatar() {
	const currentImage = "https://robohash.org/test";

	const [image, setImage] = useState<string | "">(currentImage);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const url = reader.result as string;
				setImage(url);
				console.log(url);
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<main>
			<div className="flex flex-col justify-center items-start pb-4">
				<h2 className="text-sm">Avatar</h2>
				<p className="text-muted-foreground text-xs">Edit your avatar here</p>
			</div>
			<Dialog>
				<DialogTrigger>
					<Avatar className="h-[200px] w-[200px] text-white border-amber-500 border-2">
						<AvatarImage
							className="object-cover"
							src={image}
						/>
						<AvatarFallback>{"test".toUpperCase().slice(0, 2)}</AvatarFallback>
					</Avatar>
				</DialogTrigger>
				<DialogContent>
					<DialogTitle className="flex flex-col justify-start items-start">
						Upload an avatar
					</DialogTitle>
					<DialogHeader>
						<input
							className="h-full w-full"
							type="file"
							accept="image/*"
							onChange={handleChange}
						/>
					</DialogHeader>
					<DialogFooter>
						<DialogClose>
							<Button variant="outline">Done</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	);
}

export default CustomAvatar;
