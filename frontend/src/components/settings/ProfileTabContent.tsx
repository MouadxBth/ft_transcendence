import { TabsContent } from "../ui/tabs";
import SettingsForm from "./SettingsForm";

const ProfileTabContent = ({ className, value }: { className?: string; value: string }) => {
	return (
		<TabsContent
			value={value}
			className={className}
		>
			<SettingsForm className="grid grid-cols-2 gap-2 p-2 space-y-6 w-full" />
		</TabsContent>
	);
};

export default ProfileTabContent;
