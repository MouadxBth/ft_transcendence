"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import ChannelFindForm from "../form/join/ChannelFindForm";
import ChannelInvitedForm from "../form/invited/ChannelInvitedForm";

const ChannelJoinTab = () => {
	return (
		<Tabs
			defaultValue="find"
			className="w-full"
		>
			<TabsList className="w-full flex">
				<TabsTrigger
					value="find"
					className="basis-1/2"
				>
					Find
				</TabsTrigger>
				<TabsTrigger
					value="invited"
					className="basis-1/2"
				>
					Invited
				</TabsTrigger>
			</TabsList>

			<TabsContent value="find">
				<ChannelFindForm />
			</TabsContent>

			<TabsContent value="invited">
				<ChannelInvitedForm />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelJoinTab;
