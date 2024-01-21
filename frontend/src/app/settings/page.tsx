"use client";
import ProfileForm from "@/components/settings/form";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomAvatar from "@/components/settings/CustomAvatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsTabs from "@/components/settings/settingsTabs";

function Settings() {
	return (
		<main>
			<ScrollArea className="max-h-screen p-8">
				<div>
					<h2 className="text-2xl tracking-tight">Settings</h2>
					<p className="text-muted-foreground">Manage your account.</p>
				</div>
				<Separator className="shrink-0 h-[1px] w-full my-6" />
				<SettingsTabs />
			</ScrollArea>
		</main>
	);
}
export default Settings;
