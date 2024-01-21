import React from "react";
import ProfileForm from "@/components/settings/form";
import CustomAvatar from "@/components/settings/CustomAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LockKeyhole, Settings2, SettingsIcon, SunMoon, UserRound } from "lucide-react";

function SettingsTabs() {
	return (
		<main>
			<Tabs
				defaultValue="profile"
				className="flex flex-row w-full h-full p-12"
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
		</main>
	);
}

export default SettingsTabs;
