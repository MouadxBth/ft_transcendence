"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelCreationForm from "../form/create/ChannelCreationForm";

const ChannelCreationTab = () => {
	return (
		<Tabs
			defaultValue="public"
			className="w-full"
		>
			<TabsList className="w-full flex">
				<TabsTrigger
					value="public"
					className="basis-1/3"
				>
					Public
				</TabsTrigger>
				<TabsTrigger
					value="protected"
					className="basis-1/3"
				>
					Protected
				</TabsTrigger>
				<TabsTrigger
					value="private"
					className="basis-1/3"
				>
					Private
				</TabsTrigger>
			</TabsList>

			<TabsContent value="public">
				<ChannelCreationForm type="public" />
			</TabsContent>

			<TabsContent value="protected">
				<ChannelCreationForm type="protected" />
			</TabsContent>

			<TabsContent value="private">
				<ChannelCreationForm type="private" />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelCreationTab;
