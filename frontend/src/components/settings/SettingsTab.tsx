import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import React from "react";
import SettingsTabList from "./SettingsTabList";
import ProfileTabContent from "./ProfileTabContent";
import TwofaContent from "./TwofaContent";

const SettingsTab = ({ className, defaultValue }: { className?: string; defaultValue: string }) => {
	return (
		<Tabs
			defaultValue={defaultValue}
			className={className}
		>
			<SettingsTabList className="flex flex-col h-full items-start space-y-3 bg-hidden shadow-hidden w-72 p-6" />
			<ProfileTabContent
				className=" w-full p-10 border-l h-full "
				value="profile"
			/>
			<TwofaContent
				className="w-full pl-12 border-l h-full"
				value="2fa"
			/>
		</Tabs>
	);
};

export default SettingsTab;
