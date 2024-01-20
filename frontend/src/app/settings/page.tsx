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

function Settings() {
	return (
		<main>
			<ScrollArea className="h-screen p-10">
				<div>
					<h2 className="text-2xl tracking-tight">Settings</h2>
					<p className="text-muted-foreground">Manage your account.</p>
				</div>
				<Separator className="shrink-0 h-[1px] w-full my-6" />
				<div className="flex flex-col justify-center items-center">
					<CustomAvatar />
					<ProfileForm />
				</div>
			</ScrollArea>
		</main>
	);
}

export default Settings;
