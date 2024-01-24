import { UserRound, LockKeyhole } from "lucide-react";
import { TabsList, TabsTrigger } from "../ui/tabs";

const SettingsTabList = ({ className }: { className?: string }) => {
	return (
		<TabsList className={className}>
			<TabsTrigger
				value="profile"
				className="flex justify-start items-start space-x-3 data-[state=active]:shadow-none w-full data-[state=active]:bg-white/10"
			>
				<UserRound size={20} />
				<div>Profile</div>
			</TabsTrigger>
			<TabsTrigger
				value="2fa"
				className="flex justify-start items-center space-x-3 data-[state=active]:shadow-none data-[state=active]:bg-white/10 w-full"
			>
				<LockKeyhole size={20} />
				<div>2FA</div>
			</TabsTrigger>
		</TabsList>
	);
};

export default SettingsTabList;
