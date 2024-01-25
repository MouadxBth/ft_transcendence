"use client";
import SettingsForm from "@/components/settings/SettingsForm";
import TwoFaContent from "@/components/settings/TwoFaComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsHeader = ({ className }: { className?: string }) => {
	return (
		<div className="pl-2 pb-2 space-y-1 w-56">
			<h1 className="text-2xl font-semibold leading-none tracking-tight">Settings</h1>
			<p className="text-sm text-muted-foreground">Manage Your Account</p>
		</div>
	);
};

const SettingsPage = () => {
	return (
		<main className="h-full flex items-center">
			<article className="flex flex-col h-full justify-center space-y-6 w-full container">
				<SettingsHeader className="place-content-start" />
				<div className="flex space-x-2 items-center">
					<ScrollArea className="2xl:h-full  h-96 rounded-xl w-full p-2 pt-0 border-2">
						<SettingsForm />
					</ScrollArea>
					<TwoFaContent className="w-full h-full" />
				</div>
			</article>
		</main>
	);
};

export default SettingsPage;
