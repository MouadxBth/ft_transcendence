"use client";
import ProfileForm from "@/components/settings/form";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomAvatar from "@/components/settings/CustomAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Settings() {
	return (
		<main>
			<ScrollArea className="max-h-screen p-8">
				<div>
					<h2 className="text-2xl tracking-tight">Settings</h2>
					<p className="text-muted-foreground">Manage your account.</p>
				</div>
				<Separator className="shrink-0 h-[1px] w-full my-6" />
				<Tabs
					defaultValue="profile"
					className="flex flex-row h-screen w-full"
				>
					<TabsList className="flex flex-col h-full justify-start items-start space-y-3 bg-hidden w-64">
						<TabsTrigger value="profile">Profile</TabsTrigger>
						<TabsTrigger value="2fa">2FA</TabsTrigger>
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
						className="w-full pl-12 border-l"
					>
						2FA
					</TabsContent>
				</Tabs>
			</ScrollArea>
		</main>
	);
}
export default Settings;
