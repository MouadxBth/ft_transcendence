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
import CustomAvatar from "@/components/settings/CustomAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Settings() {
	return (
		<main>
			<ScrollArea className="h-screen p-10">
				<div>
					<h2 className="text-2xl tracking-tight">Settings</h2>
					<p className="text-muted-foreground">Manage your account.</p>
				</div>
				<Separator className="shrink-0 h-[1px] w-full my-6" />
				<div className="flex">
					<aside className="w-96 p-12 h-fit">
						<div className="space-y-4">
							<div>profile</div>
							<div>2FA</div>
						</div>
					</aside>
					<div className="w-full pl-12">
						<CustomAvatar />
						<ProfileForm />
					</div>
				</div>
				{/* <Tabs className="space-y-24 flex">
					<TabsList className="flex flex-col h-fit bg-white/0 w-96 space-y-3">
						<TabsTrigger
							value="profile"
							className="w-full"
						>
							Profile
						</TabsTrigger>
						<TabsTrigger
							value="2fa"
							className="w-full"
						>
							2FA
						</TabsTrigger>
					</TabsList>
					<TabsContent
						value="profile"
						className="flex flex-col justify-center items-start  w-full bg-red-700"
					>
						<CustomAvatar />
						<ProfileForm />
					</TabsContent>
					<TabsContent
						value="2fa"
						className="flex flex-col justify-center items-start"
					>
						2FA settings
					</TabsContent>
				</Tabs> */}
				{/* <div className="flex flex-col justify-center items-center">
					<CustomAvatar />
					<ProfileForm />
				</div> */}
			</ScrollArea>
		</main>
	);
}

export default Settings;
