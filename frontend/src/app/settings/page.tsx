import React from "react";
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

function Settings() {
	return (
		<article className="flex flex-col h-screen w-screen">
			{/* <Navbar></Navbar> */}
			<Card className="h-full w-full">
				<CardHeader>
					<CardTitle>Settings</CardTitle>
					<CardDescription>Manage your account</CardDescription>
				</CardHeader>
				<CardContent className="flex h-fit items-center justify-evenly">
					<ProfileForm />
					<div className="h-80 w-1 bg-white/10"></div>
					<div className="flex justify-center items-center">2fa</div>
				</CardContent>
			</Card>
		</article>
	);
}

export default Settings;
