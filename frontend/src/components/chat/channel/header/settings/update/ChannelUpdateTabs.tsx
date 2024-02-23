import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChannelType } from "@/lib/types/channel/channel";
import ChannelAddPasswordForm from "./ChannelAddPasswordForm";
import ChannelModifyPasswordForm from "./ChannelModifyPasswordForm";
import ChannelDeletePassword from "./ChannelDeletePassword";

export interface ChannelUpdateTabsProps {
	channel: ChannelType;
}

const ChannelUpdateTabs = ({ channel }: ChannelUpdateTabsProps) => {
	return (
		<Tabs className="w-full">
			<TabsList className="w-full">
				<TabsTrigger
					className="basis-1/3"
					value="add"
					disabled={channel.status === "PROTECTED" || channel.status === "PRIVATE"}
				>
					Add
				</TabsTrigger>
				<TabsTrigger
					className="basis-1/3"
					value="modify"
					disabled={channel.status === "PUBLIC" || channel.status === "PRIVATE"}
				>
					Modify
				</TabsTrigger>
				<TabsTrigger
					className="basis-1/3"
					value="delete"
					disabled={channel.status === "PUBLIC" || channel.status === "PRIVATE"}
				>
					Delete
				</TabsTrigger>
			</TabsList>

			<TabsContent value="add">
				<ChannelAddPasswordForm channel={channel} />
			</TabsContent>
			<TabsContent value="modify">
				<ChannelModifyPasswordForm channel={channel} />
			</TabsContent>
			<TabsContent value="delete">
				<ChannelDeletePassword channel={channel} />
			</TabsContent>
		</Tabs>
	);
};

export default ChannelUpdateTabs;
