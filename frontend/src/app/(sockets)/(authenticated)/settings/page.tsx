import TwoFaContent from "@/components/settings/2fa/TwoFaContent";
import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsForm from "@/components/settings/form/SettingsForm";
import { ScrollArea } from "@/components/ui/scroll-area";

const SettingsPage = () => {
	return (
		<article className="flex flex-col h-full justify-center space-y-3 w-full container">
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
