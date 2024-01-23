"use client";

import CustomAvatar from "@/components/settings/CustomAvatar";
import ProfileForm from "@/components/settings/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, LockKeyhole, Settings, UserRound } from "lucide-react";

const SettingsPage = () => {
	return (
		<article className="h-full flex justify-center flex-col">
			<Card className="flex flex-col justify-center border-none h-20 w-full ">
				<CardHeader className="flex flex-row items-center space-x-3">
					<Settings size={35} />
					<div>
						<CardTitle>Settings</CardTitle>
						<CardDescription>Manage your account</CardDescription>
					</div>
				</CardHeader>
			</Card>
			<Card className="m-3">
				<CardContent className="">
					<Tabs
						defaultValue="profile"
						className="flex flex-row w-full h-full"
					>
						<TabsList className="flex flex-col h-full items-start space-y-3 bg-hidden shadow-hidden w-72">
							<TabsTrigger
								value="profile"
								className="flex justify-start items-start space-x-3 data-[state=active]:shadow-none"
							>
								<UserRound size={20} />
								<div>Profile</div>
							</TabsTrigger>
							<TabsTrigger
								value="2fa"
								className="flex justify-start items-center space-x-3 data-[state=active]:shadow-none"
							>
								<LockKeyhole size={20} />
								<div>2FA</div>
							</TabsTrigger>
						</TabsList>
						<TabsContent
							value="profile"
							className=" w-full pl-12 border-l"
						>
							<div className="flex flex-col justify-center space-y-6">
								<CustomAvatar />
								<ProfileForm />
							</div>
						</TabsContent>
						<TabsContent
							value="2fa"
							className="w-full pl-12 border-l h-full"
						>
							2FA
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</article>
	);
};

export default SettingsPage;
