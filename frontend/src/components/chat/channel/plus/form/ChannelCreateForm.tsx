"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelFormPrivate from "./forms/ChannelFormPrivate";
import ChannelFormProtected from "./forms/ChannelFormProtected";
import ChannelFormPublic from "./forms/ChannelFormPublic";

const ChannelCreateForm = () => {
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
				<ChannelFormPublic />
			</TabsContent>
			<TabsContent value="protected">
				<ChannelFormProtected />
			</TabsContent>
			<TabsContent value="private">
				<ChannelFormPrivate />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelCreateForm;
