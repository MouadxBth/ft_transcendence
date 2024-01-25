"use client";
import TwoFaContent from "@/components/settings/2fa/TwoFaContent";
import SettingsForm from "@/components/settings/form/SettingsForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SettingsHeaderProps {
	className?: string;
}

const SettingsHeader = ({ className }: SettingsHeaderProps) => {
	return (
		<div className="pl-2 pb-2 space-y-1 w-56">
			<h1 className="text-2xl font-semibold leading-none tracking-tight">Settings</h1>
			<p className="text-sm text-muted-foreground">Manage Your Account</p>
		</div>
	);
};

const SettingsPage = () => {
	return (
		<article className="flex items-satrt justify-center flex-col h-full w-[2000px] space-y-3 container">
			<SettingsHeader />
			<div className="flex justify-arround space-x-2 items-center max-md:flex-col max-md:space-y-2 w-full">
				<ScrollArea className="2xl:h-full  h-[500px] rounded-xl w-full p-2 pt-0 border-2">
					<SettingsForm />
				</ScrollArea>
				<ScrollArea className="2xl:h-full h-[500px] rounded-xl w-full p-2 pt-0 border-2">
					<TwoFaContent />
				</ScrollArea>
			</div>
		</article>
	);
};

export default SettingsPage;
