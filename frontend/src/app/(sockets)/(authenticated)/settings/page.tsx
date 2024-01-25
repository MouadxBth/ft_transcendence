"use client";
import SettingsForm from "@/components/settings/SettingsForm";
import TwoFaContent from "@/components/settings/TwoFaComponent";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsPage = () => {
	return (
		<article className="h-full flex items-center justify-center w-full">
			<ScrollArea className="items-center py-2 xl:h-full h-96 bg-red-500 w-full">
				<SettingsForm className="grid grid-cols-2 gap-2 p-2 space-y-20 w-full h-full bg-green-500" />
			</ScrollArea>

			<TwoFaContent className="w-full h-full bg-yellow-500" />
		</article>
	);
};

export default SettingsPage;
