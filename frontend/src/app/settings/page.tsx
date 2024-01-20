"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ProfileForm from "@/components/settings/form";
import Navbar from "@/components/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function Settings() {
	// const avatar = "https://robohash.org/test";
	// const [newavatar, setNewAvatar] = useState(avatar);
	// const addNew = () => {
	// 	setNewAvatar()
	// }

	return (
		<article className="flex flex-col h-screen w-screen">
			<Navbar></Navbar>
			<Card className="h-full">
				<CardHeader>
					<CardTitle>Settings</CardTitle>
					<CardDescription>Manage your account</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-evenly items-center">
					<Avatar className="h-22 w-22 text-white border-amber-500 border-2">
						<AvatarImage
							className="object-cover"
							src={"https://robohash.org/test"}
						/>
						<AvatarFallback>{"test".toUpperCase().slice(0, 2)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<ProfileForm />
					</div>
					<div className="h-80 w-1 bg-white/10"></div>
					<div className=" w-96 flex justify-center items-center">2fa</div>
				</CardContent>
			</Card>
		</article>
	);
}

export default Settings;
