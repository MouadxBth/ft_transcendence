"use client";
import SettingsForm from "@/components/settings/SettingsForm";
import SettingsTab from "@/components/settings/SettingsTab";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockKeyhole, Settings, UserRound } from "lucide-react";

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
			<Card className=" border-none">
				<CardContent>
					<SettingsTab
						className="flex flex-row w-full h-full"
						defaultValue="profile"
					/>
				</CardContent>
			</Card>
		</article>
	);
};

export default SettingsPage;
